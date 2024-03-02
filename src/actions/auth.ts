"use server";

import bcrypt from "bcryptjs";

import db from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

type TRegister = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const register = async ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}: TRegister) => {
  const session = await getSession();

  if (session.isLoggedIn) return redirect("/dashboard");

  const emailExists = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (emailExists) return { error: true, message: "Email is already in use." };
  if (password !== confirmPassword)
    return {
      error: true,
      message: "Password and confirm password must match.",
    };

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    },
  });

  session.isLoggedIn = true;
  session.userId = newUser.id;

  await session.save();

  return redirect("/dashboard");
};

type TLogin = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: TLogin) => {
  const session = await getSession();

  if (session.isLoggedIn) return redirect("/dashboard");

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return { error: true, message: "Invalid Credentials" };

  if (!(await bcrypt.compare(password, user.password)))
    return { error: true, message: "Invalid Credentials" };

  session.isLoggedIn = true;
  session.userId = user.id;

  await session.save();

  return redirect("/dashboard");
};

export const logout = async () => {
  const session = await getSession();

  session.destroy();

  return redirect("/");
};
