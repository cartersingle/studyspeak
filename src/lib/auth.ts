import { type SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";

type TSession = {
  userId: string;
  isLoggedIn: boolean;
};

const defaultSession: TSession = {
  userId: "",
  isLoggedIn: false,
};

const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: "study-speak-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const getSession = async () => {
  const session = await getIronSession<TSession>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.userId = defaultSession.userId;
    session.isLoggedIn = defaultSession.isLoggedIn;
    return session;
  } else {
    return session;
  }
};
