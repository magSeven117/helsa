'use client'

import { DailyProvider, DailyVideo, useDaily, useMeetingState, useParticipantIds, useTranscription } from '@daily-co/daily-react'
import { useEffect, useState } from 'react'
import { useSession } from '@/src/components/auth/session-provider'
import { Button } from '@helsa/ui/components/button'
import { cn } from '@helsa/ui/lib/utils'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff,
  Settings,
  Volume2Icon
} from 'lucide-react'

interface DailyVideoCallProps {
  roomUrl: string
  token?: string
  appointmentId: string
}

function CallUI({ roomUrl, token, appointmentId }: { roomUrl: string; token?: string; appointmentId: string }) {
  const { user } = useSession()
  const daily = useDaily()
  const meetingState = useMeetingState()
  const participantIds = useParticipantIds()
  const [showTranscription, setShowTranscription] = useState(false)
  const [transcriptionStatus, setTranscriptionStatus] = useState<string>('')
  
  const {
    isTranscribing,
    transcriptions,
    startTranscription,
    stopTranscription,
    error: transcriptionError,
  } = useTranscription({
    onTranscriptionStarted: () => {
      console.log('🎤 Transcripción iniciada')
      setTranscriptionStatus('Transcripción iniciada correctamente')
    },
    onTranscriptionStopped: () => {
      console.log('🛑 Transcripción detenida')
      setTranscriptionStatus('Transcripción detenida')
    },
    onTranscriptionError: (err) => {
      console.error('❌ Error de transcripción:', err)
      setTranscriptionStatus(`Error: ${err?.errorMsg || JSON.stringify(err)}`)
    },
    onTranscriptionMessage: (msg) => {
      console.log('📝 Nuevo mensaje:', msg)
    },
  })

  useEffect(() => {
    if (!daily) return
    // Unirse al room con token si está disponible
    const joinOptions: any = { url: roomUrl }
    if (token) {
      joinOptions.token = token
      console.log('🔑 Uniéndose con token de transcripción')
    }
    
    daily.join(joinOptions)
    return () => {
      daily && daily.leave()
    }
  }, [daily, roomUrl, token])

  // Iniciar transcripción automática en español cuando se une a la sala
  useEffect(() => {
    if (meetingState === 'joined-meeting' && token && !isTranscribing) {
      console.log('🎤 Iniciando transcripción automática en español...')
      const startAutoTranscription = async () => {
        try {
          await startTranscription({
            language: 'es'
          })
          setTranscriptionStatus('Transcripción automática iniciada en español')
          console.log('✅ Transcripción automática iniciada en español')
        } catch (error) {
          console.error('❌ Error iniciando transcripción automática:', error)
          setTranscriptionStatus('Error iniciando transcripción automática')
        }
      }
      
      // Pequeño delay para asegurar que todo esté listo
      setTimeout(startAutoTranscription, 1000)
    }
  }, [meetingState, token, isTranscribing, startTranscription])

  const handleStartTranscription = async () => {
    try {
      setTranscriptionStatus('Iniciando transcripción...')
      console.log('🔧 Intentando iniciar transcripción...')
      
      if (meetingState !== 'joined-meeting') {
        console.log('⚠️ No estamos conectados aún, esperando...')
        setTranscriptionStatus('Esperando conexión...')
        return
      }
      
      const participants = daily?.participants()
      const localParticipant = participants?.local
      
      if (localParticipant && !localParticipant.permissions.canAdmin) {
        console.log('⚠️ No tiene permisos de transcripción')
        setTranscriptionStatus('Error: No tienes permisos de transcripción. Usa un token válido.')
        return
      }
      
      console.log('✅ Permisos verificados, iniciando transcripción en español...')
      await startTranscription({
        language: 'es'
      })
    } catch (error) {
      console.error('💥 Error al iniciar transcripción:', error)
      setTranscriptionStatus(`Error al iniciar: ${error}`)
    }
  }

  const handleStopTranscription = async () => {
    try {
      setTranscriptionStatus('Deteniendo transcripción...')
      await stopTranscription()
    } catch (error) {
      console.error('💥 Error al detener transcripción:', error)
      setTranscriptionStatus(`Error al detener: ${error}`)
    }
  }

  const handleLeaveCall = () => {
    if (daily) {
      daily.leave()
    }
  }

  if (meetingState === 'left-meeting') {
    return (
      <div className="relative w-full flex-1">
        <div className="h-full w-full flex flex-col justify-center items-center gap-3">
          <p className="text-lg font-semibold">Has salido de la videollamada</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Volver a unirse
          </Button>
        </div>
      </div>
    )
  }

  if (meetingState === 'joining-meeting' || meetingState === 'loading') {
    return (
      <div className="relative w-full flex-1">
        <div className="h-full w-full flex flex-col justify-center items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-lg font-semibold">Conectando a la videollamada...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full flex-1 flex">
      {/* Video Container */}
      <div className="flex-1 h-full bg-gray-900 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {participantIds.map(sessionId => (
            <DailyVideo 
              key={sessionId} 
              sessionId={sessionId} 
              type="video"
              automirror 
              className="w-full h-full rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Transcription Panel */}
      {showTranscription && (
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">📝 Transcripción</h3>
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
            <div className={cn(
              "mb-4 p-2 rounded text-xs",
              transcriptionStatus.includes('Error') 
                ? 'bg-red-100 border border-red-400 text-red-700'
                : 'bg-blue-100 border border-blue-400 text-blue-700'
            )}>
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
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-xs">
              <div className="font-semibold">Error de Transcripción:</div>
              <div>Detalles: {JSON.stringify(transcriptionError)}</div>
            </div>
          )}

          {/* Transcription List */}
          <div className="h-64 overflow-y-auto bg-white border border-gray-200 rounded p-3">
            {transcriptions.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">
                {isTranscribing ? 'Escuchando...' : 'No hay transcripciones'}
              </p>
            ) : (
              <div className="space-y-2">
                {transcriptions.map((transcription, idx) => (
                  <div key={idx} className="text-sm">
                    <div className="text-gray-500 text-xs">
                      {new Date(transcription.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="text-gray-900">
                      {transcription.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Debug Info */}
          <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
            <div className="font-semibold">Debug Info:</div>
            <div>Estado: {isTranscribing ? 'Activa' : 'Inactiva'}</div>
            <div>Transcripciones: {transcriptions.length}</div>
            <div>Participantes: {participantIds.length}</div>
            <div>Token: {token ? '✅ Disponible' : '❌ No disponible'}</div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2 bg-white rounded-lg shadow-lg p-2">
          <Button
            onClick={() => daily?.setLocalAudio(!daily?.localAudio())}
            variant={daily?.localAudio() ? "default" : "destructive"}
            size="sm"
          >
            {daily?.localAudio() ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>
          <Button
            onClick={() => daily?.setLocalVideo(!daily?.localVideo())}
            variant={daily?.localVideo() ? "default" : "destructive"}
            size="sm"
          >
            {daily?.localVideo() ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          </Button>
          <Button
            onClick={() => setShowTranscription(!showTranscription)}
            variant={showTranscription ? "default" : "outline"}
            size="sm"
          >
            📝
          </Button>
          <Button
            onClick={handleLeaveCall}
            variant="destructive"
            size="sm"
          >
            <PhoneOff className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function DailyVideoCall({ roomUrl, token, appointmentId }: DailyVideoCallProps) {
  const { user } = useSession()
  
  return (
    <DailyProvider url={roomUrl} userName={user?.name.value || 'Usuario'}>
      <CallUI roomUrl={roomUrl} token={token} appointmentId={appointmentId} />
    </DailyProvider>
  )
}





