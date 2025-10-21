import { useCallback, useEffect, useRef, useState } from 'react';
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';

export type TranscriptWord = {
  word: string;
  start: number;
  end: number;
  confidence: number;
  speaker?: number;
};

export type TranscriptSegment = {
  text: string;
  speaker: number;
  timestamp: number;
  isFinal: boolean;
  words?: TranscriptWord[];
};

type UseDeepgramTranscriptionReturn = {
  isTranscribing: boolean;
  transcripts: TranscriptSegment[];
  error: string | null;
  startTranscription: (mediaStream: MediaStream) => Promise<void>;
  stopTranscription: () => void;
};

export const useDeepgramTranscription = (
  appointmentId: string
): UseDeepgramTranscriptionReturn => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptSegment[]>([]);
  const [error, setError] = useState<string | null>(null);

  const connectionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const keepAliveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTranscription = useCallback(async (mediaStream: MediaStream) => {
    try {
      setError(null);
      setIsTranscribing(true);

      // Obtener token de Deepgram
      const tokenResponse = await fetch('/api/deepgram/token', {
        method: 'POST',
      });

      if (!tokenResponse.ok) {
        throw new Error(`Error obteniendo token: ${tokenResponse.status}`);
      }

      const { token } = await tokenResponse.json();
      
      if (!token || typeof token !== 'string') {
        throw new Error('Token de Deepgram inválido');
      }

      // Crear cliente de Deepgram
      const deepgram = createClient(token);

      // Configurar conexión de live transcription
      const connection = deepgram.listen.live({
        model: 'nova-2',
        language: 'es',
        smart_format: true,
        punctuate: true,
        diarize: true,
        interim_results: true,
        encoding: 'linear16',
        sample_rate: 16000,
        channels: 1,
        vad_events: true,
        // Configuración adicional para mejor compatibilidad
        multichannel: false,
        profanity_filter: false,
        redact: false,
      });

      connectionRef.current = connection;

      // Manejar eventos de transcripción
      connection.on(LiveTranscriptionEvents.Open, () => {
        // Verificar que el stream tenga audio
        const audioTracks = mediaStream.getAudioTracks();
        
        if (audioTracks.length === 0) {
          setError('No se detectó audio en el stream');
          return;
        }

        // Usar Web Audio API directamente según documentación oficial
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ 
          sampleRate: 16000 
        });
        
        // Guardar referencias para cleanup
        audioContextRef.current = audioContext;
        
        // Crear fuente de audio desde el MediaStream
        const source = audioContext.createMediaStreamSource(mediaStream);
        
        // Crear procesador de audio para capturar datos raw
        const processor = audioContext.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;
        
        // Procesar audio en tiempo real
        processor.onaudioprocess = (event) => {
          if (connection.getReadyState() === 1) {
            const inputBuffer = event.inputBuffer;
            const inputData = inputBuffer.getChannelData(0);
            
            // Convertir Float32Array a Int16Array (PCM linear16)
            const pcmData = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              pcmData[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32767));
            }
            
            // Solo enviar si hay audio real (no solo silencio)
            const hasAudio = pcmData.some(sample => Math.abs(sample) > 100);
            if (hasAudio) {
              connection.send(pcmData.buffer);
            }
          }
        };

        // Conectar el procesador
        source.connect(processor);
        processor.connect(audioContext.destination);

        // Keep-alive: enviar mensaje KeepAlive cada 5 segundos
        keepAliveIntervalRef.current = setInterval(() => {
          if (connection.getReadyState() === 1) {
            connection.keepAlive();
          }
        }, 5000);
      });

      connection.on(LiveTranscriptionEvents.Transcript, (data) => {
        // Verificar que tenemos alternativas
        if (!data.channel || !data.channel.alternatives || data.channel.alternatives.length === 0) {
          return;
        }

        const transcript = data.channel.alternatives[0];
        
        // Verificar que tenemos texto
        if (!transcript || !transcript.transcript || transcript.transcript.trim() === '') {
          return;
        }


        const segment: TranscriptSegment = {
          text: transcript.transcript,
          speaker: transcript.words?.[0]?.speaker ?? 0,
          timestamp: Date.now(),
          isFinal: data.is_final,
          words: transcript.words?.map((w: any) => ({
            word: w.word,
            start: w.start,
            end: w.end,
            confidence: w.confidence,
            speaker: w.speaker,
          })),
        };

        setTranscripts((prev) => {
          // Si es final, agregarlo. Si no, reemplazar el último no-final
          if (segment.isFinal) {
            return [...prev.filter(t => t.isFinal), segment];
          } else {
            return [...prev.filter(t => t.isFinal), segment];
          }
        });

        // Guardar transcripciones finales en el backend
        if (data.is_final) {
          fetch('/api/deepgram/save-transcript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              appointmentId,
              text: transcript.transcript,
              speaker: segment.speaker,
              timestamp: segment.timestamp,
              words: segment.words,
            }),
          }).catch(() => {
            // Error silencioso - no afecta la funcionalidad
          });
        }
      });

      connection.on(LiveTranscriptionEvents.Error, (error) => {
        setError(`Error de transcripción: ${error.message || error}`);
      });

      connection.on(LiveTranscriptionEvents.Close, () => {
        setIsTranscribing(false);
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setIsTranscribing(false);
    }
  }, [appointmentId]);

  const stopTranscription = useCallback(() => {
    // Limpiar keep-alive interval
    if (keepAliveIntervalRef.current) {
      clearInterval(keepAliveIntervalRef.current);
      keepAliveIntervalRef.current = null;
    }

    // Desconectar procesador de audio
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    // Cerrar AudioContext
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Cerrar conexión de Deepgram
    if (connectionRef.current) {
      connectionRef.current.finish();
      connectionRef.current = null;
    }

    setIsTranscribing(false);
  }, []);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      stopTranscription();
    };
  }, [stopTranscription]);

  return {
    isTranscribing,
    transcripts,
    error,
    startTranscription,
    stopTranscription,
  };
};

