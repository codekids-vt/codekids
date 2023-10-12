'use client'
import React from 'react';

export interface IReaderProps {
  text: string;
}

export function Reader(props: IReaderProps) {


  const onSpeechStart = () => {
    let utterance = new SpeechSynthesisUtterance(props.text);
    speechSynthesis.speak(utterance);
  }

  return (
    <div>
      <button className="text-blue-500" onClick={onSpeechStart}>🔊</button>
      <span className="">{props.text}</span>
    </div>
  );
}
