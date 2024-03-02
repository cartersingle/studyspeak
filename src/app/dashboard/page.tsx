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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
        {recordings.length === 0 && (
          <div className="col-span-2 flex justify-center mt-8">
            <p className="text-muted-foreground">No flashcards yet</p>
          </div>
        )}
        {recordings.map((recording) => (
          <Link
            href={`/recording/${recording.id}`}
            key={recording.id}
            className="col-span-1 border rounded-md p-4 flex flex-col justify-between gap-y-8 transition hover:bg-muted"
          >
            <h2 className="text-2xl font-medium">{recording.name}</h2>
            <p className="text-muted-foreground text-sm">
              {recording.flashCards.length} cards
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
