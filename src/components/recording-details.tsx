"use client";

import { FlashCard, Recording } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Flashcards } from "./flashcards";
import { Button } from "./ui/button";

export const RecordingDetails = ({
  recording,
}: {
  recording: Recording & {
    flashCards: FlashCard[];
  };
}) => {
  const router = useRouter();
  const isRunning = recording.status === "RUNNING";

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      axios.post("/api/recording", { recordingId: recording.id }),
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong generating flashcards.");
    },
  });

  return (
    <div className="space-y-8 py-8">
      <div className="aspect-video w-3/4 mx-auto bg-muted rounded-md">
        {isRunning ? (
          <div className=" h-full flex items-center justify-center">
            {isPending ? (
              <div className="flex flex-col items-center gap-y-2">
                <Loader2 className="size-10 animate-spin" />
                <p className="text-muted-foreground">
                  Generating your flashcards...
                </p>
              </div>
            ) : (
              <Button onClick={() => mutate()}>Generate Flashcards</Button>
            )}
          </div>
        ) : (
          <Flashcards flashcards={recording.flashCards} />
        )}
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl">Audio</h2>
        <div className="flex justify-center">
          <audio
            className="w-full"
            src={recording.recordingUrl}
            controls
          ></audio>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl">Transcription</h2>
        {isRunning ? (
          <div className="space-y-1">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        ) : (
          <p>{recording?.recordingText}</p>
        )}
      </div>
    </div>
  );
};
