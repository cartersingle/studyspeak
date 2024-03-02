"use client";

import { saveRecording } from "@/actions/recording";
import { Button } from "@/components/ui/button";
import { uploadFiles } from "@/lib/uploadhelpers";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

export const Recorder = () => {
  const { mutate } = useMutation({
    mutationFn: async (file: Blob) => {
      console.log(file);
      const response = await uploadFiles("audioUploader", {
        files: [
          new File([file], `${nanoid()}.webm`, {
            type: "audio/webm;codecs=opus",
          }),
        ],
      });

      await saveRecording(response[0].url);
    },
  });

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
  } = useAudioRecorder();

  useEffect(() => {
    if (recordingBlob) {
      mutate(recordingBlob);
    }
  }, [recordingBlob, mutate]);

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
      {!recordingBlob ? (
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
          <Button
            variant="ghost"
            onClick={stopRecording}
            disabled={!isRecording}
          >
            Stop Recording
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-2">
          <Loader2 className="size-10 animate-spin" />
          <p className="text-muted-foreground">Saving your recording...</p>
        </div>
      )}
    </div>
  );
};
