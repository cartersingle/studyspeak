import { RecordingDetails } from "@/components/recording-details";
import { getRecording } from "@/lib/data";
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
      <h1 className="font-semibold text-3xl">{recording.name}</h1>
      <RecordingDetails recording={recording} />
    </div>
  );
};

export default Recording;
