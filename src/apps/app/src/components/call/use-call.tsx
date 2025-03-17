import { createClient } from '@helsa/supabase/client';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useCallStore } from './provider';
import { CallState } from './store';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

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
    setOutputDevices,
    setSelectedAudioDevice,
    setSelectedVideoDevice,
    setSelectedOutputDevice,
    selectedAudioDevice,
    selectedVideoDevice,
    setIsRecording,
    setIsTranscribing,
    channel,
    setChannel,
  } = useCallStore((store) => store);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any | null>(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      const audioDevices = devices.filter((device) => device.kind === 'audioinput');
      const outputDevices = devices.filter((device) => device.kind === 'audiooutput');
      setVideoDevices(videoDevices);
      setAudioDevices(audioDevices);
      setOutputDevices(outputDevices);
      setSelectedVideoDevice(videoDevices[0]);
      setSelectedAudioDevice(audioDevices[0]);
      setSelectedOutputDevice(outputDevices[0]);
    });
  }, []);

  const createSocket = () => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
    const client = createClient();
    const channel = client.channel(roomId);
    channel.on('broadcast', { event: 'user-joined' }, (payload) => {
      setRemoteParticipant(payload.data);
    });
    channel.on('broadcast', { event: 'user-left' }, (_payload) => {
      setRemoteParticipant(null);
    });
    setChannel(channel);
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

      socket.on('answer', async (answer, isServer = false) => {
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

      socket.on('start-recording', () => startRecording());
      socket.on('stop-recording', () => stopRecording());
      socket.on('start-transcription', () => startTranscription());
      socket.on('stop-transcription', () => stopTranscription());
      setPeerConnection(peerConnection);
    }
  };

  const leftCall = () => {
    if (socket && roomId && peerConnection) {
      socket.emit('leave-call', roomId);
      localStream?.getTracks().forEach((track) => track.stop());
      peerConnection.close();
      setIsRecording(false);
      setIsTranscribing(false);
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

  const startTranscription = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('SpeechRecognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'es-ES';

    const handleResult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      console.log('Transcription:', transcript);
    };

    recognition.onresult = handleResult;
    recognition.onerror = (event: any) => {
      console.error('SpeechRecognition error:', event.error);
    };
    recognition.onend = () => {
      console.log('SpeechRecognition ended.');
    };

    const localAudioStream = new MediaStream(localStream?.getAudioTracks() || []);
    const remoteAudioStream = new MediaStream(peerConnection?.getReceivers().map((receiver) => receiver.track) || []);

    const startRecognition = (stream: MediaStream) => {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(2048, 1, 1);

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (event) => {
        const inputData = event.inputBuffer.getChannelData(0);
        const buffer = new Float32Array(inputData.length);
        buffer.set(inputData);

        const audioBlob = new Blob([buffer], { type: 'audio/wav' });
        const audioURL = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioURL);
        audio.play();
      };
    };

    startRecognition(localAudioStream);
    startRecognition(remoteAudioStream);

    recognition.start();
    recognitionRef.current = recognition;
    setIsTranscribing(true);
  };

  const stopTranscription = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsTranscribing(false);
    }
  };

  const startRecording = () => {
    if (localStream) {
      const mediaRecorder = new MediaRecorder(localStream, {
        mimeType: 'video/webm; codecs=vp9',
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: 'video/webm',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'recording.webm';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        recordedChunksRef.current = [];
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
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
    startTranscription,
    stopTranscription,
    startRecording,
    stopRecording,
  };
};
