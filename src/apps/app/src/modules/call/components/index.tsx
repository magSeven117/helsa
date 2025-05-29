'use client';
import { useRoom } from '@/src/modules/appointment/hooks/use-room';
import { BetterUser } from '@helsa/auth/server';
import { Button } from '@helsa/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@helsa/ui/components/popover';
import { Separator } from '@helsa/ui/components/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@helsa/ui/components/tooltip';
import { cn } from '@helsa/ui/lib/utils';
import {
  Call,
  CallingState,
  OwnCapability,
  ParticipantView,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  StreamVideoParticipant,
  TranscriptionSettingsRequestModeEnum,
  useCall,
  useCallStateHooks,
  useParticipantViewContext,
  VideoPlaceholderProps,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { intervalToDuration } from 'date-fns';
import { motion } from 'framer-motion';
import {
  AlarmClockPlus,
  AudioLines,
  InfoIcon,
  Mic,
  MicOff,
  PhoneIncoming,
  PhoneOff,
  PlayCircle,
  Settings,
  StopCircle,
  Video,
  VideoOff,
  Volume2Icon,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import CallCHat from '../../call-chat/components';
import { useSession } from '../../auth/components/session-provider';

const apiKey = process.env.NEXT_PUBLIC_STREAM_CLIENT_KEY!;

export const VideoCall = ({ id, token }: { id: string; token: string }) => {
  const { user } = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  useEffect(() => {
    if (!user) {
      return;
    }
    const streamUser = {
      id: user.id,
      name: user.name,
      image: user.image ?? '',
      role: user.role === 'PATIENT' ? 'patient' : 'doctor',
    };
    const newClient = new StreamVideoClient({
      apiKey,
      user: streamUser,
      token,
    });
    const newCall = newClient.call('appointment', id);
    const init = async () => {
      newCall.getOrCreate();
      setClient(newClient);
      setCall(newCall);
    };
    init();
  }, [user]);
  if (!client || !call || !user) {
    return null;
  }
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
};

const calculateParticipantTimeInCall = (joinedAt: Date) => {
  const now = new Date();
  return intervalToDuration({
    start: joinedAt,
    end: now,
  });
};

export const MyUILayout = () => {
  const call = useCall();
  const [otherEntered, setOtherEntered] = useState(false);

  const { useLocalParticipant, useParticipantCount, useRemoteParticipants, useCallCallingState } = useCallStateHooks();
  const participantCount = useParticipantCount();
  const callCallingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const { enterRoom } = useRoom();

  const joinCall = useCallback(async () => {
    if (call) {
      call.join();

      await enterRoom(call.id);
    }
  }, [call]);

  if (call?.state.endedAt) {
    return (
      <div className="relative w-full flex-1">
        <div className="h-full w-full flex flex-col justify-center items-center gap-3">
          <p className="text-lg font-semibold">La llamada ha finalizado</p>
        </div>
      </div>
    );
  }

  if (!localParticipant || callCallingState === CallingState.LEFT) {
    return (
      <div className="relative w-full flex-1">
        <div className="h-full w-full flex flex-col justify-center items-center gap-3">
          <p className="text-lg font-semibold">Únete a la llamada para poder ver a los demás participantes</p>
          <Button onClick={joinCall} className="rounded-full gap-3" variant={'outline'}>
            <PhoneIncoming className="size-4" />
            Entrar
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full flex-1 flex">
      {callCallingState == CallingState.JOINED && (
        <>
          <MyFloatingLocalParticipant participant={localParticipant} count={participantCount} />
          <MyParticipantList participants={remoteParticipants} />
          <ActionsBar />
          <CallCHat id={call?.id ?? ''} />
        </>
      )}
    </div>
  );
};

export const MyParticipantList = (props: { participants: StreamVideoParticipant[] }) => {
  const { participants } = props;
  if (participants.length === 0) {
    return (
      <div className="flex h-full w-1/2 justify-center items-center rounded-r-xl overflow-auto" id="participant-list">
        <p className="text-lg font-semibold">Esperando a que alguien se una a la llamada</p>
      </div>
    );
  }
  return (
    <div className="flex flex-row gap-[8px] w-1/2 h-full rounded-r-xl overflow-auto">
      {participants.map((participant) => (
        <ParticipantView
          participant={participant}
          key={participant.sessionId}
          className="rounded-r-xl border"
          ParticipantViewUI={ParticipantDetails}
          VideoPlaceholder={CustomVideoPlaceholder}
        />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: { participant?: StreamVideoParticipant; count: number }) => {
  const { participant } = props;

  return (
    <div className="h-full w-1/2 bg-background rounded-l-xl border  overflow-auto no-scroll">
      <div className="h-full w-full">
        <ParticipantView
          participant={participant!}
          className="h-full rounded-l-xl"
          mirror={false}
          ParticipantViewUI={ParticipantDetails}
          VideoPlaceholder={CustomVideoPlaceholder}
        />
      </div>
    </div>
  );
};

const ParticipantDetails = () => {
  const { participant } = useParticipantViewContext();
  return (
    <div title={participant.name} className="absolute flex justify-start items-center gap-3 bottom-1 left-2">
      <span>{participant.isLocalParticipant ? 'Tu' : participant.name || participant.userId}</span>
      <div className="flex justify-start items-center gap-2  py-2 px-3 bg-gray-600/50 rounded-full">
        {participant.audioStream ? <Mic className="size-4" /> : <MicOff className="size-4" />}
        {participant.videoStream ? <Video className="size-4" /> : <VideoOff className="size-4" />}
      </div>
    </div>
  );
};

const CustomVideoPlaceholder = ({ style }: VideoPlaceholderProps) => {
  const { participant } = useParticipantViewContext();
  return (
    <>
      {participant.image && !participant.videoStream && (
        <div className="h-[100px] w-[100px] rounded-full overflow-hidden border">
          <img className=" object-contain" src={participant.image} alt={participant.userId} />
        </div>
      )}
      {!participant.image && <span>{participant.name || participant.userId}</span>}
    </>
  );
};

const ActionsBar = () => {
  const [user] = useLocalStorage<BetterUser | null>('user', null);
  const call = useCall();

  const { useMicrophoneState, useCameraState } = useCallStateHooks();
  const { isMute: micMute, microphone } = useMicrophoneState();
  const { isMute: cameraMute, camera } = useCameraState();
  return (
    <motion.div
      className="absolute inset-x-0 bottom-2 flex justify-center"
      initial={{ opacity: 0, filter: 'blur(8px)', y: 0 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: -24 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="backdrop-filter backdrop-blur-lg bg-background rounded-full pl-2 pr-4 py-3 h-10 flex items-center justify-center border-[0.5px] border-border">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn('rounded-full size-8', {
                  'bg-destructive': micMute,
                })}
                onClick={() => {
                  microphone.toggle();
                }}
              >
                {micMute ? <MicOff className="size-4" /> : <Mic className="size-4 text-primary" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
              <p>Mutear</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn('rounded-full size-8', {
                  'bg-destructive': cameraMute,
                })}
                onClick={() => {
                  camera.toggle();
                }}
              >
                {cameraMute ? <VideoOff className="size-4" /> : <Video className="size-4 text-primary" />}
              </Button>
            </TooltipTrigger>

            <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
              <p>Cámara</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {user?.role === 'DOCTOR' && (
          <>
            <Separator orientation="vertical" className="mr-3 ml-2 h-4" />
            <RecordingButton />
            <TranscriptionButton />
          </>
        )}
        <Separator orientation="vertical" className="mr-3 ml-2 h-4" />
        <Info />
        <DevicesList />
        <Separator orientation="vertical" className="mr-3 ml-2 h-4" />
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-6  bg-destructive"
                onClick={() => {
                  call?.leave();
                }}
              >
                <PhoneOff className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
              <p>Salir</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Separator orientation="vertical" className="mr-3 ml-2 h-4" />
        <SessionTimer />
      </div>
    </motion.div>
  );
};

const DevicesList = () => {
  const call = useCall();
  const { useMicrophoneState, useCameraState, useSpeakerState } = useCallStateHooks();
  const { devices: micDevices = [], selectedDevice: micSelected } = useMicrophoneState();
  const { devices: cameraDevices = [], selectedDevice: cameraSelected } = useCameraState();
  const { devices: speakerDevices = [], selectedDevice: speakerSelected } = useSpeakerState();
  return (
    <TooltipProvider delayDuration={0}>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={cn('rounded-full size-8')}>
                <Settings className="size-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
            <p>Configuraciones</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-[300px] rounded-none" side="top" align="start">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <div className="w-4 h-4 mr-2 flex justify-center items-center">
                  <Video />
                </div>
                <span className="text-sm">Selecciona la cámara</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-none">
                  {cameraDevices?.map((device) => (
                    <DropdownMenuItem
                      className={cn('gap-2 rounded-none', {
                        'bg-secondary': cameraSelected === device.deviceId,
                      })}
                      key={device.deviceId}
                      onClick={() => {
                        call?.camera.select(device.deviceId);
                      }}
                    >
                      <div className="w-4 h-4 mr-2 flex justify-center items-center">
                        <Video />
                      </div>
                      <span className="text-sm font-semibold">{device.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <div className="w-4 h-4 mr-2 flex justify-center items-center">
                  <Mic />
                </div>
                <span className="text-sm">Selecciona el micrófono</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-none">
                  {micDevices?.map((device) => (
                    <DropdownMenuItem
                      className={cn('gap-2 rounded-none', {
                        'bg-secondary': micSelected === device.deviceId,
                      })}
                      key={device.deviceId}
                      onClick={() => {
                        call?.microphone.select(device.deviceId);
                      }}
                    >
                      <div className="w-4 h-4 mr-2 flex justify-center items-center">
                        <Mic />
                      </div>
                      <span className="text-sm font-semibold">{device.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <div className="w-4 h-4 mr-2 flex justify-center items-center">
                  <Volume2Icon />
                </div>
                <span className="text-sm">Selecciona el parlante</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-none">
                  {speakerDevices.map((device) => (
                    <DropdownMenuItem
                      className={cn('gap-2 rounded-none', {
                        'bg-secondary': speakerSelected === device.deviceId,
                      })}
                      key={device.deviceId}
                      onClick={() => {
                        call?.speaker.select(device.deviceId);
                      }}
                    >
                      <div className="w-4 h-4 mr-2 flex justify-center items-center">
                        <Volume2Icon />
                      </div>
                      <span className="text-sm font-semibold">{device.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

const RecordingButton = () => {
  const call = useCall();
  const { useIsCallRecordingInProgress } = useCallStateHooks();
  const isCallRecordingInProgress = useIsCallRecordingInProgress();

  const toggleRecording = useCallback(async () => {
    try {
      if (isCallRecordingInProgress) {
        await call?.stopRecording();
      } else {
        await call?.startRecording();
      }
    } catch (e) {
      console.error(`Failed start recording`, e);
    }
  }, [call, isCallRecordingInProgress]);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 rounded-full" onClick={toggleRecording}>
            {isCallRecordingInProgress ? (
              <StopCircle className="size-4" />
            ) : (
              <PlayCircle className="size-4 text-primary" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
          <p>{isCallRecordingInProgress ? 'Detener grabación' : 'Iniciar grabación'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const useSessionTimer = () => {
  const { useCallSession } = useCallStateHooks();
  const session = useCallSession();
  const [remainingMs, setRemainingMs] = useState(Number.NaN);
  useEffect(() => {
    if (!session?.timer_ends_at) return;
    const timerEndAt = new Date(session.timer_ends_at);
    const handle = setInterval(() => {
      const now = new Date();
      const remainingMs = +timerEndAt - +now;
      setRemainingMs(remainingMs);
    }, 500);
    return () => clearInterval(handle);
  }, [session]);
  return remainingMs;
};

const useSessionTimerAlert = (remainingMs: number, threshold: number, onAlert: VoidFunction) => {
  const didAlert = useRef(false);
  useEffect(() => {
    if (!didAlert.current && remainingMs < threshold) {
      onAlert();
    }
  }, [onAlert, remainingMs, threshold]);
};
const SessionTimer = () => {
  const [user] = useLocalStorage<BetterUser | null>('user', null);
  const call = useCall();
  const [showAlert, setShowAlert] = useState(false);
  const [hasReachedZero, setHasReachedZero] = useState(false);
  const remainingMs: number = useSessionTimer();
  useSessionTimerAlert(remainingMs, 5 * 60 * 1000, () => setShowAlert(true));
  useSessionTimerAlert(remainingMs, 0, () => setHasReachedZero(true));
  const { useHasPermissions } = useCallStateHooks();
  const canEnd = useHasPermissions(OwnCapability.END_CALL);

  useEffect(() => {
    if (hasReachedZero && canEnd) {
      setTimeout(() => {
        call?.endCall();
      }, 60000);
    }
  }, [hasReachedZero]);

  if (hasReachedZero) {
    return <div>El tiempo se ha acabado la llamada se cerrará en 1 minuto</div>;
  }

  return (
    <div className="mx-2 text-sm flex items-center gap-3">
      <p className={cn({ 'text-red-500': showAlert })}>
        {
          intervalToDuration({
            start: Date.now(),
            end: Date.now() + remainingMs,
          }).minutes
        }
        :
        {intervalToDuration({
          start: Date.now(),
          end: Date.now() + remainingMs,
        })
          .seconds?.toString()
          .padStart(2, '0')}
      </p>
      {showAlert && user?.role === 'DOCTOR' && <ExtendSessionButton duration={900} />}
    </div>
  );
};

const ExtendSessionButton = ({ duration }: { duration: number }) => {
  const call = useCall();
  const { useCallSettings, useHasPermissions } = useCallStateHooks();
  const settings = useCallSettings();
  const canExtend = useHasPermissions(OwnCapability.CHANGE_MAX_DURATION);

  const extendTime = useCallback(() => {
    if (!call) return;
    call.update({
      settings_override: {
        limits: {
          max_duration_seconds: (settings!.limits!.max_duration_seconds ?? 0) + duration,
        },
      },
    });
  }, [call, duration]);
  if (!canExtend) {
    return null;
  }
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full size-8" onClick={extendTime}>
            <AlarmClockPlus className="size-4" />
          </Button>
        </TooltipTrigger>

        <TooltipContent sideOffset={15} className="text-[10px] px-2 py-1 rounded-sm font-medium">
          <p>Tiempo restante en la llamada, extiéndela</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const TranscriptionButton = () => {
  const call = useCall();
  const { useCallSettings, useIsCallTranscribingInProgress } = useCallStateHooks();
  const { transcription } = useCallSettings() || {};

  const isTranscribing = useIsCallTranscribingInProgress();

  if (transcription?.mode === TranscriptionSettingsRequestModeEnum.DISABLED) {
    // transcriptions are not available, render nothing
    return null;
  }

  const toggleTranscription = useCallback(() => {
    if (!isTranscribing) {
      call?.startTranscription({ language: 'es' });
    } else {
      call?.stopTranscription();
    }
  }, [isTranscribing]);

  return (
    <Button variant="ghost" size="icon" className="rounded-full size-8" onClick={toggleTranscription}>
      {!isTranscribing ? (
        <AudioLines className="size-4" />
      ) : (
        <AudioLines className="size-4 text-red-500 animate-pulse" />
      )}
    </Button>
  );
};

const Info = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full size-8">
          <InfoIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-none" alignOffset={10} sideOffset={20}>
        Tanto las grabaciones como las transcripciones de la llamada las podrás encontrar en la sección de historial
      </PopoverContent>
    </Popover>
  );
};
