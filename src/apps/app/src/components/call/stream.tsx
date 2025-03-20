'use client';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
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
import { Separator } from '@helsa/ui/components/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@helsa/ui/components/tooltip';
import { cn } from '@helsa/ui/lib/utils';
import {
  Call,
  CallingState,
  ParticipantView,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  StreamVideoParticipant,
  useCall,
  useCallStateHooks,
  useParticipantViewContext,
  useStreamVideoClient,
  VideoPlaceholderProps,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { User } from 'better-auth';
import { motion } from 'framer-motion';
import { Mic, MicOff, PhoneIncoming, PhoneOff, PlayCircle, Settings, StopCircle, Video, VideoOff } from 'lucide-react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const VideoCallOld = ({ id, token }: { id: string; token: string }) => {
  const [user] = useLocalStorage<User | null>('user', null);
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  useEffect(() => {
    const init = async () => {
      if (!user) {
        return;
      }
      const newClient = StreamVideoClient.getOrCreateInstance({
        apiKey: process.env.NEXT_PUBLIC_STREAM_CLIENT_KEY ?? '',
        user: {
          id: user!.id ?? '',
        },
        token,
      });
      await newClient.connectUser({ id: user!.id ?? '' }, token);
      setClient(newClient);
    };

    init();

    return () => {
      if (client) {
        client.disconnectUser();
        setClient(null);
      }
    };
  }, [user]);
  if (!client) {
    return null;
  }
  return (
    <StreamVideo client={client}>
      <VideoCallPage id={id} />
    </StreamVideo>
  );
};

export const VideoCallPage = ({ id }: { id: string }) => {
  const client = useStreamVideoClient();

  if (!client) {
    return null;
  }

  const [call, setCall] = useState<Call | null>(null);
  useEffect(() => {
    const initCall = async () => {
      const newCall = client.call('default', id);
      await newCall.getOrCreate();
      setCall(newCall);
    };
    initCall();
  }, []);
  if (!call) {
    return null;
  }
  return (
    <StreamCall call={call}>
      <MyUILayout />
    </StreamCall>
  );
};

const DroppableContainer = ({ id, children, className }: { id: string; children?: ReactNode; className?: string }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className={cn('absolute h-1/2 w-1/2', className)}>
      {children}
    </div>
  );
};

export const MyUILayout = () => {
  const call = useCall();

  const { useLocalParticipant, useParticipantCount, useRemoteParticipants, useCallCallingState } = useCallStateHooks();
  const participantCount = useParticipantCount();
  const callCallingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const [parent, setParent] = useState<any>('drop-1');

  if (!localParticipant || callCallingState === CallingState.LEFT) {
    return (
      <div className="relative w-full flex-1">
        <div className="h-full w-full flex flex-col justify-center items-center gap-3">
          <p className="text-lg font-semibold">
            {remoteParticipants.length > 0 ? 'Te están esperando' : 'No hay nadie en la llamada'}
          </p>
          <Button onClick={() => call?.join()} className="rounded-full gap-3" variant={'outline'}>
            <PhoneIncoming className="size-4" />
            Entrar
          </Button>
        </div>
      </div>
    );
  }
  const handleDragEnd = ({ over }: any) => {
    setParent(over?.id ?? 'drop-1');
  };
  const localVideo = <MyFloatingLocalParticipant participant={localParticipant} count={participantCount} />;
  return (
    <div className="relative w-full flex-1">
      {callCallingState == CallingState.JOINED && (
        <DndContext onDragEnd={handleDragEnd}>
          <MyParticipantList participants={remoteParticipants} />
          <DroppableContainer className="p-4 top-0 left-0 flex items-start justify-start" id="drop-1">
            {parent === 'drop-1' && localVideo}
          </DroppableContainer>
          <DroppableContainer className="p-4 top-0 right-0 flex items-start justify-end" id="drop-2">
            {parent === 'drop-2' && localVideo}
          </DroppableContainer>
          <DroppableContainer className="p-4 bottom-0 left-0 flex items-end justify-start" id="drop-3">
            {parent === 'drop-3' && localVideo}
          </DroppableContainer>
          <DroppableContainer className="p-4 bottom-0 right-0 flex items-end justify-end" id="drop-4">
            {parent === 'drop-4' && localVideo}
          </DroppableContainer>
          <ActionsBar />
        </DndContext>
      )}
    </div>
  );
};

export const MyParticipantList = (props: { participants: StreamVideoParticipant[] }) => {
  const { participants } = props;
  if (participants.length === 0) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <p className="text-lg font-semibold">Esperando a que alguien se una a la llamada</p>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', height: '100%' }}>
      {participants.map((participant) => (
        <ParticipantView
          participant={participant}
          key={participant.sessionId}
          className="rounded-none border"
          ParticipantViewUI={ParticipantDetails}
          VideoPlaceholder={CustomVideoPlaceholder}
        />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: { participant?: StreamVideoParticipant; count: number }) => {
  const { participant } = props;
  const call = useCall();
  const { useCallCallingState } = useCallStateHooks();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'local-video',
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: 10,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="h-[125px] aspect-video bg-background border">
        <ParticipantView
          participant={participant!}
          className="h-full"
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
              <p>Mute</p>
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
              <p>Camera</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Separator orientation="vertical" className="mr-3 ml-2 h-4" />
        <RecordingButton />
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
              <p>Camera</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DevicesList />
        <Separator orientation="vertical" className="mr-3 ml-2 h-4" />
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-6 ml-5 bg-destructive"
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
                  <Mic />
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
                        <Mic />
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
          <Button variant="ghost" size="icon" onClick={toggleRecording}>
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
