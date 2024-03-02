"use server";

import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export const saveRecording = async (url: string) => {
  const { isLoggedIn, userId } = await getSession();

  if (!isLoggedIn) return redirect("/");

  const newRecording = await db.recording.create({
    data: {
      recordingUrl: url,
      userId,
    },
  });

  return redirect(`/recording/${newRecording.id}`);
};
