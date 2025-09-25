'use client';

import { useSession } from '@/src/components/auth/session-provider';
import { DailyProvider, DailyVideo, useDaily, useMeetingState, useParticipantIds, useTranscription } from '@daily-co/daily-react';
import { Button } from '@helsa/ui/components/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Brain, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

interface DailyVideoCallProps {
  roomUrl: string;
  token?: string;
  appointmentId: string;
}

interface TranscriptionAnalysis {
  summary: string;
  keyPoints: string[];
  medicalTerms: string[];
  recommendations: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  urgency: 'low' | 'medium' | 'high';
}

function CallUI({ roomUrl, token, appointmentId }: { roomUrl: string; token?: string; appointmentId: string }) {
  const { user } = useSession();
  const daily = useDaily();
  const meetingState = useMeetingState();
  const participantIds = useParticipantIds();
  const [showTranscription, setShowTranscription] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [transcriptionStatus, setTranscriptionStatus] = useState<string>('');
  const [analysis, setAnalysis] = useState<TranscriptionAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Mutación para análisis completo
  const { mutateAsync: analyzeTranscription } = useMutation({
    mutationFn: async (transcriptions: any[]) => {
      const response = await fetch('/api/v1/transcription/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcriptions,
          appointmentId,
        }),
      });
      if (!response.ok) throw new Error('Error analyzing transcription');
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysis(data.data.analysis);
      setIsAnalyzing(false);
    },
    onError: (error) => {
      console.error('Error analyzing transcription:', error);
      setIsAnalyzing(false);
    },
  });

  // Mutación para análisis en tiempo real
  const { mutateAsync: analyzeRealTime } = useMutation({
    mutationFn: async (transcription: any) => {
      const response = await fetch('/api/v1/transcription/analyze', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcription,
          appointmentId,
        }),
      });
      if (!response.ok) throw new Error('Error in real-time analysis');
      return response.json();
    },
  });
  
  const {
    isTranscribing,
    transcriptions,
    startTranscription,
    stopTranscription,
    error: transcriptionError,
  } = useTranscription({
    onTranscriptionStarted: () => {
      console.log('🎤 Transcripción iniciada');
      setTranscriptionStatus('Transcripción iniciada correctamente');
    },
    onTranscriptionStopped: () => {
      console.log('🛑 Transcripción detenida');
      setTranscriptionStatus('Transcripción detenida');
    },
    onTranscriptionError: (err) => {
      console.error('❌ Error de transcripción:', err);
      setTranscriptionStatus(`Error: ${err?.errorMsg || JSON.stringify(err)}`);
    },
    onTranscriptionMessage: (msg) => {
      console.log('📝 Nuevo mensaje:', msg);
      // Análisis en tiempo real de cada mensaje
      if (msg.text && msg.text.length > 10) {
        analyzeRealTime({
          text: msg.text,
          timestamp: new Date(msg.timestamp).toLocaleTimeString(),
          speaker: msg.participantId || 'Paciente',
        });
      }
    },
  });

  useEffect(() => {
    if (!daily) return;
    
    // Unirse al room con token si está disponible
    const joinOptions: any = { url: roomUrl };
    if (token) {
      joinOptions.token = token;
      console.log('🔑 Uniéndose con token de transcripción');
    }
    
    daily.join(joinOptions);
    return () => {
      daily && daily.leave();
    };
  }, [daily, roomUrl, token]);

  // Iniciar transcripción automática en español cuando se une a la sala
  useEffect(() => {
    if (meetingState === 'joined-meeting' && token && !isTranscribing) {
      console.log('🎤 Iniciando transcripción automática en español...');
      const startAutoTranscription = async () => {
        try {
          await startTranscription({
            language: 'es'
          });
          setTranscriptionStatus('Transcripción automática iniciada en español');
          console.log('✅ Transcripción automática iniciada en español');
        } catch (error) {
          console.error('❌ Error iniciando transcripción automática:', error);
          setTranscriptionStatus('Error iniciando transcripción automática');
        }
      };
      
      // Pequeño delay para asegurar que todo esté listo
      setTimeout(startAutoTranscription, 1000);
    }
  }, [meetingState, token, isTranscribing, startTranscription]);

  const handleStartTranscription = async () => {
    try {
      setTranscriptionStatus('Iniciando transcripción...');
      console.log('🔧 Intentando iniciar transcripción...');
      
      // Verificar que estemos conectados antes de continuar
      if (meetingState !== 'joined-meeting') {
        console.log('⚠️ No estamos conectados aún, esperando...');
        setTranscriptionStatus('Esperando conexión...');
        return;
      }
      
      // Verificar permisos antes de iniciar
      const participants = daily?.participants();
      const localParticipant = participants?.local;
      
      console.log('👤 Participante local:', localParticipant);
      console.log('🔑 Permisos:', localParticipant?.permissions);
      console.log('🎫 Token disponible:', token ? 'Sí' : 'No');
      console.log('🔗 Estado de conexión:', meetingState);
      
      // Verificar si tiene permisos de transcripción
      if (localParticipant && !localParticipant.permissions.canAdmin) {
        console.log('⚠️ No tiene permisos de transcripción');
        setTranscriptionStatus('Error: No tienes permisos de transcripción. Usa un token válido.');
        return;
      }
      
      console.log('✅ Permisos verificados, iniciando transcripción en español...');
      await startTranscription({
        language: 'es'
      });
    } catch (error) {
      console.error('💥 Error al iniciar transcripción:', error);
      setTranscriptionStatus(`Error al iniciar: ${error}`);
    }
  };

  const handleStopTranscription = async () => {
    try {
      setTranscriptionStatus('Deteniendo transcripción...');
      await stopTranscription();
    } catch (error) {
      console.error('💥 Error al detener transcripción:', error);
      setTranscriptionStatus(`Error al detener: ${error}`);
    }
  };

  const handleAnalyzeTranscription = async () => {
    if (transcriptions.length === 0) {
      setTranscriptionStatus('No hay transcripciones para analizar');
      return;
    }

    setIsAnalyzing(true);
    setTranscriptionStatus('Analizando transcripción con IA...');
    
    try {
      const transcriptionData = transcriptions.map(t => ({
        text: t.text,
        timestamp: new Date(t.timestamp).toLocaleTimeString(),
        speaker: 'Paciente',
      }));
      
      await analyzeTranscription(transcriptionData);
      setTranscriptionStatus('Análisis completado');
    } catch (error) {
      console.error('Error analyzing transcription:', error);
      setTranscriptionStatus('Error en el análisis');
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Videollamada Médica</h2>
            <p className="text-sm opacity-90">Estado: {meetingState || 'Conectando...'}</p>
          </div>
          <div className="flex items-center gap-2">
            {token && (
              <div className="text-xs opacity-90">
                🎫 Token de transcripción: Activo
              </div>
            )}
            {transcriptions.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAnalyzeTranscription}
                disabled={isAnalyzing}
                className="text-xs"
              >
                <Brain className="h-3 w-3 mr-1" />
                {isAnalyzing ? 'Analizando...' : 'Analizar con IA'}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Video Container */}
        <div className="flex-1 bg-background p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {participantIds.map(sessionId => (
              <DailyVideo 
                key={sessionId} 
                sessionId={sessionId} 
                type="video"
                automirror 
                className="w-full h-full rounded-lg border"
              />
            ))}
          </div>
        </div>

        {/* Transcription Panel */}
        {showTranscription && (
          <div className="w-80 bg-muted border-l p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">📝 Transcripción</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranscription(false)}
              >
                ✕
              </Button>
            </div>
            
            {/* Status Display */}
            {transcriptionStatus && (
              <div className={`mb-4 p-2 rounded text-xs ${
                transcriptionStatus.includes('Error') 
                  ? 'bg-destructive/10 border border-destructive text-destructive'
                  : 'bg-primary/10 border border-primary text-primary'
              }`}>
                {transcriptionStatus}
              </div>
            )}

            {/* Token Info */}
            {token && (
              <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded text-xs">
                <div className="font-semibold text-green-800">✅ Token con permisos de transcripción</div>
                <div className="text-green-700">La transcripción se iniciará automáticamente en español</div>
              </div>
            )}

            {/* Transcription Controls */}
            <div className="flex gap-2 mb-4">
              <Button
                onClick={handleStartTranscription}
                disabled={isTranscribing}
                size="sm"
                className="flex-1"
              >
                {isTranscribing ? '🎤 Grabando...' : '🎤 Reiniciar (Español)'}
              </Button>
              <Button
                onClick={handleStopTranscription}
                disabled={!isTranscribing}
                variant="destructive"
                size="sm"
                className="flex-1"
              >
                🛑 Detener
              </Button>
            </div>

            {/* Error Display */}
            {transcriptionError && (
              <div className="mb-4 p-2 bg-destructive/10 border border-destructive text-destructive rounded text-xs">
                <div className="font-semibold">Error de Transcripción:</div>
                <div>Detalles: {JSON.stringify(transcriptionError)}</div>
              </div>
            )}

            {/* Transcription List */}
            <div className="h-64 overflow-y-auto bg-background border rounded p-3">
              {transcriptions.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center">
                  {isTranscribing ? 'Escuchando...' : 'No hay transcripciones'}
                </p>
              ) : (
                <div className="space-y-2">
                  {transcriptions.map((transcription, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="text-muted-foreground text-xs">
                        {new Date(transcription.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="text-foreground">
                        {transcription.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Debug Info */}
            <div className="mt-4 p-2 bg-muted rounded text-xs">
              <div className="font-semibold">Debug Info:</div>
              <div>Estado: {isTranscribing ? 'Activa' : 'Inactiva'}</div>
              <div>Transcripciones: {transcriptions.length}</div>
              <div>Participantes: {participantIds.length}</div>
              <div>Token: {token ? '✅ Disponible' : '❌ No disponible'}</div>
            </div>
          </div>
        )}

        {/* AI Analysis Panel */}
        {showAnalysis && analysis && (
          <div className="w-80 bg-muted border-l p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">🧠 Análisis de IA</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAnalysis(false)}
              >
                ✕
              </Button>
            </div>
            
            {/* Summary */}
            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">📋 Resumen</h4>
              <p className="text-xs text-muted-foreground bg-background p-2 rounded">
                {analysis.summary}
              </p>
            </div>

            {/* Key Points */}
            {analysis.keyPoints.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2">🔑 Puntos Clave</h4>
                <ul className="text-xs space-y-1">
                  {analysis.keyPoints.map((point, idx) => (
                    <li key={idx} className="bg-background p-2 rounded">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Medical Terms */}
            {analysis.medicalTerms.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2">🏥 Términos Médicos</h4>
                <div className="flex flex-wrap gap-1">
                  {analysis.medicalTerms.map((term, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysis.recommendations.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2">💡 Recomendaciones</h4>
                <ul className="text-xs space-y-1">
                  {analysis.recommendations.map((rec, idx) => (
                    <li key={idx} className="bg-green-50 p-2 rounded border-l-2 border-green-200">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sentiment & Urgency */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-background p-2 rounded">
                <div className="font-medium">Sentimiento</div>
                <div className={`${
                  analysis.sentiment === 'positive' ? 'text-green-600' :
                  analysis.sentiment === 'negative' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {analysis.sentiment === 'positive' ? '😊 Positivo' :
                   analysis.sentiment === 'negative' ? '😟 Negativo' : '😐 Neutral'}
                </div>
              </div>
              <div className="bg-background p-2 rounded">
                <div className="font-medium">Urgencia</div>
                <div className={`${
                  analysis.urgency === 'high' ? 'text-red-600' :
                  analysis.urgency === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {analysis.urgency === 'high' ? '🔴 Alta' :
                   analysis.urgency === 'medium' ? '🟡 Media' : '🟢 Baja'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 bg-muted border-t">
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            variant={daily?.localAudio() ? "default" : "destructive"}
            size="icon"
            onClick={() => daily?.setLocalAudio(!daily?.localAudio())}
          >
            {daily?.localAudio() ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>
          
          <Button
            variant={daily?.localVideo() ? "default" : "destructive"}
            size="icon"
            onClick={() => daily?.setLocalVideo(!daily?.localVideo())}
          >
            {daily?.localVideo() ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          </Button>
          
          <Button
            variant={showTranscription ? "default" : "outline"}
            size="icon"
            onClick={() => setShowTranscription(!showTranscription)}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          
          {analysis && (
            <Button
              variant={showAnalysis ? "default" : "outline"}
              size="icon"
              onClick={() => setShowAnalysis(!showAnalysis)}
            >
              <Brain className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            variant="destructive"
            size="icon"
            onClick={() => daily?.leave()}
          >
            <PhoneOff className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Info */}
        <div className="text-center text-sm text-muted-foreground mt-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Conectado con Daily.co</span>
            {isTranscribing && (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Transcribiendo...</span>
              </>
            )}
          </div>
          <p className="text-xs">
            Participantes: {participantIds.length} | Estado: {meetingState || 'Conectando...'}
            {isTranscribing && ` | Transcripciones: ${transcriptions.length}`}
            {token && ' | 🎫 Token activo'}
          </p>
        </div>
      </div>
    </div>
  );
}

const DailyVideoCall = ({ roomUrl, token, appointmentId }: DailyVideoCallProps) => {
  const { user } = useSession();
  
  if (!roomUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">Cargando videollamada...</p>
      </div>
    );
  }

  return (
    <DailyProvider url={roomUrl} userName={user?.name?.value || 'Usuario'}>
      <CallUI roomUrl={roomUrl} token={token} appointmentId={appointmentId} />
    </DailyProvider>
  );
};

export default DailyVideoCall;