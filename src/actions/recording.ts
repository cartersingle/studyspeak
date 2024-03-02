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

  const res = await fetch(`${process.env.SERVER_URL}/api/recording`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recordingId: newRecording.id }),
  });

  if (res.ok) {
    return redirect(`/recording/${newRecording.id}`);
  } else {
    return { error: true, message: "Something went wrong saving recording." };
  }
};
