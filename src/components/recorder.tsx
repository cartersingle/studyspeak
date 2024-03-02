"use client";

import { Button } from "@/components/ui/button";
import { useAudioRecorder } from "react-audio-voice-recorder";

export const Recorder = () => {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
  } = useAudioRecorder();

  function handleClick() {
    if (isRecording) {
      togglePauseResume();
    } else {
      startRecording();
    }
  }

  const secs = (recordingTime - Math.floor(recordingTime / 60) * 60).toString();

  const formattedTime = `${Math.floor(recordingTime / 60)}:${
    secs.length === 1 ? "0" + secs : secs
  }`;

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-y-2">
        <p className="text-muted-foreground font-medium">{formattedTime}</p>
        <Button
          size="icon"
          className="size-40 rounded-full text-xl"
          variant={isRecording ? "outline" : "default"}
          onClick={handleClick}
        >
          {isRecording ? (isPaused ? "Resume" : "Pause") : "Start"}
        </Button>
        <Button variant="ghost" onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </Button>
      </div>
    </div>
  );
};
