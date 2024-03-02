import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const Dashboard = async () => {
  const { isLoggedIn } = await getSession();

  if (!isLoggedIn) return redirect("/");

  return (
    <div className="max-w-2xl mx-auto px-2">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-3xl">Flashcards</h1>
        <Button>
          <Link href="/record">Record</Link>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
