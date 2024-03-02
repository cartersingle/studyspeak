"use client";

import { FlashCard, Recording } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getRecording } from "@/lib/data";
import axios from "axios";

export const RecordingDetails = ({
  defaultData,
}: {
  defaultData: Recording & {
    flashCards: FlashCard[];
  };
}) => {
  const isRunning = defaultData.status === "RUNNING";

  const { data } = useQuery({
    queryKey: ["recording", defaultData.id],
    initialData: defaultData,
    queryFn: async () => await getRecording(defaultData.id),
    refetchInterval: isRunning ? 3000 : false,
  });

  useQuery({
    queryKey: ["generate", defaultData.id],
    queryFn: async () =>
      axios.post("/api/recording", { recordingId: data?.id }),
    enabled: data?.status === "RUNNING",
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="space-y-8 py-8">
      <div className="aspect-video w-3/4 mx-auto bg-muted rounded-md">
        {isRunning ? (
          <div className=" h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-y-2">
              <Loader2 className="size-10 animate-spin" />
              <p className="text-muted-foreground">
                Generating your flashcards...
              </p>
            </div>
          </div>
        ) : (
          <p>Flashcards go here</p>
        )}
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl">Audio</h2>
        <div className="flex justify-center">
          <audio
            className="w-full"
            src={defaultData.recordingUrl}
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
          <p>{data?.recordingText}</p>
        )}
      </div>
    </div>
  );
};
