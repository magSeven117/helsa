'use client';
import { Button } from '@/libs/shadcn-ui/components/button';
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
} from '@/libs/shadcn-ui/components/dropdown-menu';
import { Separator } from '@/libs/shadcn-ui/components/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/libs/shadcn-ui/components/tooltip';
import { cn } from '@/libs/shadcn-ui/utils/utils';
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
import { Mic, MicOff, PhoneIncoming, PhoneOff, Settings, Video, VideoOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export const VideoCall = ({ id, token, user }: { id: string; token: string; user: User }) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  useEffect(() => {
    const init = async () => {
      const newClient = StreamVideoClient.getOrCreateInstance({
        apiKey: process.env.NEXT_PUBLIC_STREAM_CLIENT_KEY ?? '',
        user: {
          id: user.id ?? '',
        },
        token,
      });
      await newClient.connectUser({ id: user.id ?? '' }, token);
      setClient(newClient);
    };

    init();

    return () => {
      if (client) {
        client.disconnectUser();
        setClient(null);
      }
    };
  }, []);
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
    const newCall = client.call('default', id);
    setCall(newCall);
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

export const MyUILayout = () => {
  const call = useCall();

  const {
    useLocalParticipant,
    useParticipantCount,
    useRemoteParticipants,
    useMicrophoneState,
    useCallCallingState,
    useCameraState,
  } = useCallStateHooks();
  const participantCount = useParticipantCount();
  const { isMute: micMute, microphone, devices: micDevices } = useMicrophoneState();
  const { isMute: cameraMute, camera, devices: cameraDevices } = useCameraState();
  const callCallingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  return (
    <div className="relative w-full flex-1">
      <MyParticipantList participants={remoteParticipants} />
      <MyFloatingLocalParticipant participant={localParticipant} count={participantCount} />
      {callCallingState == CallingState.JOINED && (
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
                          {cameraDevices.map((device) => (
                            <DropdownMenuItem
                              className="gap-2 rounded-none"
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
                          {micDevices.map((device) => (
                            <DropdownMenuItem
                              className="gap-2 rounded-none"
                              key={device.deviceId}
                              onClick={() => {
                                call?.camera.select(device.deviceId);
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
      )}
    </div>
  );
};

export const MyParticipantList = (props: { participants: StreamVideoParticipant[] }) => {
  const { participants } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
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
  const callCallingState = useCallCallingState();

  if (!participant || callCallingState === CallingState.LEFT) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center gap-3">
        <p className="text-lg font-semibold">{props.count > 0 ? 'Te están esperando' : 'No hay nadie en la llamada'}</p>
        <Button onClick={() => call?.join()} className="rounded-full gap-3" variant={'outline'}>
          <PhoneIncoming className="size-4" />
          Entrar
        </Button>
      </div>
    );
  }
  return (
    <div className="absolute top-[15px] left-[15px] w-[300px] h-[165px] border">
      <ParticipantView
        participant={participant!}
        className="h-full"
        mirror={false}
        ParticipantViewUI={ParticipantDetails}
        VideoPlaceholder={CustomVideoPlaceholder}
      />
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
