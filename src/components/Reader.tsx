'use client'
import React from 'react';

export interface IReaderProps {
  text: string;
}

export function Reader(props: IReaderProps) {

  // use effect to preemtively load voices
  React.useEffect(() => {
    speechSynthesis.getVoices();
  }, []);

  const onSpeechStart = () => {
    let utterance = new SpeechSynthesisUtterance(props.text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1.2;
    let voices = speechSynthesis.getVoices();
    let voice = voices.find((voice) => voice.name === 'Google UK English Female');
    if (voice) { utterance.voice = voice; }
    speechSynthesis.speak(utterance);
  }

  return (
    <div>
      <button className="text-blue-500" onClick={onSpeechStart}>🔊</button>
      <span className="">{props.text}</span>
    </div>
  );
}
