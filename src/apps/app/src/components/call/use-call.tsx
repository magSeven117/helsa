import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useCallStore } from './provider';
import { CallState } from './store';

export const useCall = () => {
  const {
    socket,
    setSocket,
    roomId,
    localStream,
    setLocalStream,
    setRemoteStream,
    setPeerConnection,
    peerConnection,
    localParticipant,
    setCallState,
    setRemoteParticipant,
    setMicEnable,
    setCameraEnable,
    cameraEnable,
    micEnable,
    setVideoDevices,
    setAudioDevices,
    setSelectedAudioDevice,
    setSelectedVideoDevice,
    selectedAudioDevice,
    selectedVideoDevice,
  } = useCallStore((store) => store);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      const audioDevices = devices.filter((device) => device.kind === 'audioinput');
      setVideoDevices(videoDevices);
      setAudioDevices(audioDevices);
      setSelectedVideoDevice(videoDevices[0]);
      setSelectedAudioDevice(audioDevices[0]);
    });
  }, []);

  const createSocket = () => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
    newSocket.on('connect', () => {
      console.log('connected', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('disconnected', newSocket.id);
    });

    newSocket.on('user-joined', (userId, user) => {
      console.log('User joined', userId, user);
      setRemoteParticipant(user);
    });

    newSocket.on('user-left', (userId) => {
      setRemoteParticipant(null);
    });

    setSocket(newSocket);
  };

  const destroySocket = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
  };

  useEffect(() => {
    if (socket && roomId) {
      socket.emit('join-room', roomId);
    }
  }, [socket, roomId]);

  const joinCall = async () => {
    if (!socket || !roomId) {
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: selectedVideoDevice?.deviceId },
      audio: { deviceId: selectedAudioDevice?.deviceId },
    });
    setLocalStream(stream);
    socket.emit('join-call', roomId, localParticipant);
    setCallState(CallState.JOINED);

    if (stream) {
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });

      setPeerConnection(peerConnection);

      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      peerConnection.onicecandidate = function (event) {
        if (event.candidate) {
          if (socket && roomId) {
            socket.emit('ice-candidate', event.candidate, roomId);
          }
        }
      };

      peerConnection.oniceconnectionstatechange = (event) => {
        if (
          (event.target as RTCPeerConnection).iceConnectionState === 'disconnected' ||
          (event.target as RTCPeerConnection).iceConnectionState === 'failed'
        ) {
          setRemoteStream(null);
        }
      };

      peerConnection.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      const offer = await peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      socket.emit('offer', offer, roomId);
      socket.on('offer', async (offer) => {
        if (peerConnection.signalingState === 'closed') return;
        peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        socket.emit('answer', answer, roomId);
      });

      socket.on('answer', async (answer) => {
        if (peerConnection.signalingState === 'closed') return;
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      });

      socket.on('ice-candidate', async (candidate) => {
        try {
          if (peerConnection.signalingState === 'closed') return;
          await peerConnection.addIceCandidate(candidate);
        } catch (error) {
          console.error('Error adding received ice candidate', error);
        }
      });
      setPeerConnection(peerConnection);
    }
  };

  const leftCall = () => {
    if (socket && roomId && peerConnection) {
      socket.emit('leave-call', roomId);
      localStream?.getTracks().forEach((track) => track.stop());
      peerConnection.close();
      setLocalStream(null);
      setRemoteStream(null);
      setPeerConnection(null);
      setCallState(CallState.IDLE);
    }
  };

  const toggleMicrophone = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setMicEnable(!micEnable);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setCameraEnable(!cameraEnable);
    }
  };

  const setVideoDevice = async (device: MediaDeviceInfo) => {
    localStream?.getTracks().forEach((track) => track.stop());
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: device.deviceId },
      audio: { deviceId: selectedAudioDevice?.deviceId },
    });

    setSelectedVideoDevice(device);

    stream.getTracks().forEach((track) => {
      peerConnection?.addTrack(track, stream);
    });

    const offer = await peerConnection?.createOffer();
    peerConnection?.setLocalDescription(offer);
    socket?.emit('offer', offer, roomId);

    setLocalStream(stream);
  };

  const setAudioDevice = async (device: MediaDeviceInfo) => {
    localStream?.getTracks().forEach((track) => track.stop());
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: selectedVideoDevice?.deviceId },
      audio: { deviceId: device.deviceId },
    });

    setSelectedAudioDevice(device);

    stream.getTracks().forEach((track) => {
      peerConnection?.addTrack(track, stream);
    });

    const offer = await peerConnection?.createOffer();
    peerConnection?.setLocalDescription(offer);
    socket?.emit('offer', offer, roomId);

    setLocalStream(stream);
  };

  return {
    joinCall,
    leftCall,
    toggleMicrophone,
    toggleCamera,
    createSocket,
    destroySocket,
    setVideoDevice,
    setAudioDevice,
  };
};
