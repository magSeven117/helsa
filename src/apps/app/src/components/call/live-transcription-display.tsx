'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TranscriptSegment } from '@/src/hooks/useDeepgramTranscription';
import { useEffect, useRef } from 'react';

type Props = {
  transcripts: TranscriptSegment[];
  isTranscribing: boolean;
};

const LiveTranscriptionDisplay = ({ transcripts, isTranscribing }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Debug logs
  useEffect(() => {
    console.log('LiveTranscriptionDisplay - transcripts:', transcripts);
    console.log('LiveTranscriptionDisplay - isTranscribing:', isTranscribing);
  }, [transcripts, isTranscribing]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [transcripts]);

  // Solo mostrar si está transcribiendo
  if (!isTranscribing) {
    return null;
  }

  // Obtener solo los últimos 5 segmentos para mostrar
  const recentTranscripts = transcripts.slice(-5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-20 left-4 right-4 max-w-2xl mx-auto"
    >
      <div
        ref={containerRef}
        className="backdrop-filter backdrop-blur-lg bg-black/70 rounded-lg p-4 max-h-40 overflow-y-auto space-y-2"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {isTranscribing && (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-xs text-white font-medium">Transcribiendo...</span>
                <span className="text-xs text-gray-300">(Habla para ver transcripción)</span>
                <span className="text-xs text-blue-300">Debug: {transcripts.length} segmentos</span>
              </>
            )}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {recentTranscripts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="text-sm text-gray-300 italic"
            >
              Escuchando... Las transcripciones aparecerán aquí
            </motion.div>
          ) : (
            recentTranscripts.map((transcript, index) => (
              <motion.div
                key={`${transcript.timestamp}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: transcript.isFinal ? 1 : 0.7, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={`text-sm ${
                  transcript.isFinal ? 'text-white' : 'text-gray-300 italic'
                }`}
              >
                <span className="font-semibold text-[#4CAF50]">
                  {transcript.speaker === 0 ? 'Doctor' : 'Paciente'}:{' '}
                </span>
                {transcript.text}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LiveTranscriptionDisplay;

