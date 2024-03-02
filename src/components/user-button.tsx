"use client";

import { User } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { logout } from "@/actions/auth";

export const UserButton = ({ user }: { user: Omit<User, "password"> }) => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" ? (
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            Dashboard <MoveRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
