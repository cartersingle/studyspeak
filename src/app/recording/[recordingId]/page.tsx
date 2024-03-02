import { RecordingDetails } from "@/components/recording-details";
import { RecordingTitle } from "@/components/recording-title";
import { Button } from "@/components/ui/button";
import { getRecording } from "@/lib/data";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Recording = async ({
  params,
}: {
  params: {
    recordingId: string;
  };
}) => {
  const recording = await getRecording(params.recordingId);

  if (!recording) return redirect("/dashboard");

  return (
    <div className="container">
      <div className="mb-2">
        <Button size="sm" variant="ghost" asChild>
          <Link href="/dashboard">
            <MoveLeft className="mr-2 size-4" />
            Back
          </Link>
        </Button>
      </div>
      <RecordingTitle recording={recording} />
      <RecordingDetails recording={recording} />
    </div>
  );
};

export default Recording;
