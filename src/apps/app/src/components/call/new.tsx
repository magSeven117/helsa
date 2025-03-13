'use client';
import Peer from 'peerjs';
import { useEffect, useRef, useState } from 'react';
const NewCall = () => {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer>(null);
  useEffect(() => {
    const peer = new Peer();
    peer.on('open', (id) => {
      setPeerId(id);
    });
    peer.on('call', (call) => {
      const getUserMedia = navigator.mediaDevices.getUserMedia;

      getUserMedia({ video: true, audio: false }).then((stream) => {
        currentUserVideoRef.current!.srcObject = stream;
        currentUserVideoRef.current!.play();
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current!.srcObject = remoteStream;
          remoteVideoRef.current!.play();
        });
      });
    });
    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId: string) => {
    const getUserMedia = navigator.mediaDevices.getUserMedia;
    getUserMedia({ video: true, audio: false }).then((stream) => {
      currentUserVideoRef.current!.srcObject = stream;
      currentUserVideoRef.current!.play();
      const call = peerInstance.current!.call(remotePeerId, stream);
      call.on('stream', (remoteStream) => {
        remoteVideoRef.current!.srcObject = remoteStream;
        remoteVideoRef.current!.play();
      });
    });
  };
  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      <input type="text" value={remotePeerIdValue} onChange={(e) => setRemotePeerIdValue(e.target.value)} />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video ref={currentUserVideoRef} />
      </div>
      <div>
        <video ref={remoteVideoRef} />
      </div>
    </div>
  );
};

export default NewCall;
