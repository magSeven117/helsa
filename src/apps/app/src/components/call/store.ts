import { RealtimeChannel } from '@helsa/supabase/client';
import { createRef } from 'react';
import { Socket } from 'socket.io-client';
import { create } from 'zustand';

export enum CallState {
  IDLE = 'idle',
  JOINED = 'joined',
  LEFT = 'left',
  RECONNECTING = 'reconnecting',
}

export interface CallParticipant {
  id: string;
  state: string;
}

export interface CallStore {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  roomId: string;
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
  remoteVideoRef: React.RefObject<HTMLVideoElement | null>;
  peerConnection: RTCPeerConnection | null;
  recordingPeerConnection: RTCPeerConnection | null;
  socket: Socket | null;
  callState: CallState;
  localParticipant: CallParticipant | null;
  remoteParticipant: CallParticipant | null;
  micEnable: boolean;
  cameraEnable: boolean;
  roomState: 'out-room' | 'in-room';
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
  outputDevices: MediaDeviceInfo[];
  selectedVideoDevice: MediaDeviceInfo | null;
  selectedAudioDevice: MediaDeviceInfo | null;
  selectedOutputDevice: MediaDeviceInfo | null;
  isRecording: boolean;
  isTranscribing: boolean;
  channel: RealtimeChannel | null;

  setLocalStream: (stream: MediaStream | null) => void;
  setRemoteStream: (stream: MediaStream | null) => void;
  setRoomId: (roomId: string) => void;
  setPeerConnection: (peerConnection: RTCPeerConnection | null) => void;
  setRecordingPeerConnection: (peerConnection: RTCPeerConnection | null) => void;
  setSocket: (socket: Socket | null) => void;
  setCallState: (callState: CallState) => void;

  setLocalParticipant: (participant: CallParticipant | null) => void;
  setRemoteParticipant: (participant: CallParticipant | null) => void;

  setMicEnable: (micEnable: boolean) => void;
  setCameraEnable: (cameraEnable: boolean) => void;

  setRoomState: (roomState: 'out-room' | 'in-room') => void;

  setVideoDevices: (devices: MediaDeviceInfo[]) => void;
  setAudioDevices: (devices: MediaDeviceInfo[]) => void;
  setOutputDevices: (devices: MediaDeviceInfo[]) => void;

  setSelectedVideoDevice: (device: MediaDeviceInfo) => void;
  setSelectedAudioDevice: (device: MediaDeviceInfo) => void;
  setSelectedOutputDevice: (device: MediaDeviceInfo) => void;

  setIsRecording: (isRecording: boolean) => void;
  setIsTranscribing: (isTranscribing: boolean) => void;

  setChannel: (channel: RealtimeChannel | null) => void;
}

export const createCallStore = () =>
  create<CallStore>((set) => ({
    localStream: null,
    remoteStream: null,
    roomId: '',
    localVideoRef: createRef(),
    remoteVideoRef: createRef(),
    peerConnection: null,
    socket: null,
    callState: CallState.IDLE,
    localParticipant: null,
    remoteParticipant: null,
    micEnable: true,
    cameraEnable: true,
    roomState: 'out-room',
    videoDevices: [],
    audioDevices: [],
    outputDevices: [],
    selectedVideoDevice: null,
    selectedAudioDevice: null,
    selectedOutputDevice: null,
    recordingPeerConnection: null,
    isRecording: false,
    isTranscribing: false,
    channel: null,

    setLocalStream: (stream) => set({ localStream: stream }),
    setRemoteStream: (stream) => set({ remoteStream: stream }),
    setRoomId: (roomId) => set({ roomId }),
    setPeerConnection: (peerConnection) => set({ peerConnection }),
    setSocket: (socket) => set({ socket }),
    setCallState: (callState) => set({ callState }),

    setLocalParticipant: (participant) => set({ localParticipant: participant }),
    setRemoteParticipant: (participant) => set({ remoteParticipant: participant }),

    setMicEnable: (micEnable) => set({ micEnable }),
    setCameraEnable: (cameraEnable) => set({ cameraEnable }),
    setRoomState: (roomState) => set({ roomState }),

    setVideoDevices: (devices) => set({ videoDevices: devices }),
    setAudioDevices: (devices) => set({ audioDevices: devices }),
    setOutputDevices: (devices) => set({ outputDevices: devices }),

    setSelectedVideoDevice: (device) => set({ selectedVideoDevice: device }),
    setSelectedAudioDevice: (device) => set({ selectedAudioDevice: device }),
    setSelectedOutputDevice: (device) => set({ selectedOutputDevice: device }),

    setRecordingPeerConnection: (peerConnection) => set({ recordingPeerConnection: peerConnection }),
    setIsRecording: (isRecording) => set({ isRecording }),
    setIsTranscribing: (isTranscribing) => set({ isTranscribing }),
    setChannel: (channel) => set({ channel }),
  }));
