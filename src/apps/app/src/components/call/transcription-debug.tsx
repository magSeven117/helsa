'use client';

import { useState, useEffect } from 'react';
import { Button } from '@helsa/ui/components/button';

// Componente de debug para verificar el estado de transcripción
export const TranscriptionDebug = ({ 
  isTranscribing, 
  transcripts, 
  error 
}: { 
  isTranscribing: boolean; 
  transcripts: any[]; 
  error: string | null; 
}) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const newLog = `[${new Date().toLocaleTimeString()}] isTranscribing: ${isTranscribing}, transcripts: ${transcripts.length}, error: ${error}`;
    setLogs(prev => [...prev.slice(-9), newLog]);
  }, [isTranscribing, transcripts.length, error]);

  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg max-w-md max-h-96 overflow-y-auto border-2 border-gray-300">
      <h3 className="text-lg font-semibold mb-2 text-black">Debug Transcripción</h3>
      
      <div className="space-y-2 mb-4">
        <div className="text-sm text-black">
          <strong>Estado:</strong> {isTranscribing ? '🟢 Activo' : '🔴 Inactivo'}
        </div>
        <div className="text-sm text-black">
          <strong>Transcripciones:</strong> {transcripts.length}
        </div>
        <div className="text-sm text-black">
          <strong>Error:</strong> {error || 'Ninguno'}
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-black">Logs:</h4>
        {logs.map((log, index) => (
          <div key={index} className="text-xs bg-gray-100 p-1 rounded text-black">
            {log}
          </div>
        ))}
      </div>

      {transcripts.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-black">Última transcripción:</h4>
          <div className="text-xs bg-blue-100 p-2 rounded text-black">
            <pre>{JSON.stringify(transcripts[transcripts.length - 1], null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
