import { Mic } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getUser } from "@/lib/data";
import { UserButton } from "./user-button";

export const Navbar = async () => {
  const user = await getUser();

  return (
    <nav className="fixed inset-0 h-16 border-b bg-background flex items-center">
      <div className="container flex items-center justify-between">
        <Link
          href={"/"}
          className="text-xl flex items-center hover:bg-muted transition p-2 rounded-md"
        >
          <Mic className="mr-1" />
          Study<span className="font-bold">Speak</span>
        </Link>
        {user ? (
          <UserButton user={user} />
        ) : (
          <div className="flex items-center gap-x-2">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
