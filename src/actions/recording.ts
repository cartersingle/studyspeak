"use server";

import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
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

export const updateName = async (id: string, name: string) => {
  const { isLoggedIn, userId } = await getSession();

  if (!isLoggedIn) return redirect("/");

  await db.recording.update({
    where: {
      id,
      userId,
    },
    data: {
      name,
    },
  });

  revalidatePath("/dashboard");
};

export const deleteRecording = async (id: string) => {
  const { isLoggedIn, userId } = await getSession();

  if (!isLoggedIn) return redirect("/");

  await db.recording.delete({
    where: {
      id,
      userId,
    },
  });

  revalidatePath("/dashboard");
  return redirect("/dashboard");
};
