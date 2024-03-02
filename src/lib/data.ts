"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import db from "./db";

export const getUser = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return null;
  }

  return await db.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      name: true,
      email: true,
      id: true,
    },
  });
};

export const getRecording = async (id: string) => {
  const { isLoggedIn, userId } = await getSession();

  if (!isLoggedIn) return redirect("/");

  return await db.recording.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      flashCards: true,
    },
  });
};
