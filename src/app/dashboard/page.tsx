import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRecordings } from "@/lib/data";

const Dashboard = async () => {
  const recordings = await getRecordings();

  return (
    <div className="max-w-2xl mx-auto px-2">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-3xl">Flashcards</h1>
        <Button>
          <Link href="/record">Record</Link>
        </Button>
      </div>
      <div className="grid grid-cols-4">
        {recordings.length === 0 && (
          <div className="col-span-4 flex justify-center mt-8">
            <p className="text-muted-foreground">No flashcards yet</p>
          </div>
        )}
        {recordings.map((recording) => (
          <Link
            href={`/recordings/${recording.id}`}
            key={recording.id}
            className="border rounded-md p-4"
          >
            <h2 className="text-2xl">{recording.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
