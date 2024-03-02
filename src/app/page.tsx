import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" max-w-xl mx-auto space-y-8">
        <h1 className="text-7xl tracking-tight">
          The <span className="font-bold">AI</span> powered study app that{" "}
          <span className="underline">Superpowers</span> your study habits.
        </h1>
        <Button size="lg" asChild>
          <Link href="/login">
            See the Difference
            <MoveRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </>
  );
}
