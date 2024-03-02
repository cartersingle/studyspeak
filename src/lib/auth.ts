import { IncomingMessage, ServerResponse } from "http";
import { type SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";

export type TSession = {
  userId: string;
  isLoggedIn: boolean;
};

const defaultSession: TSession = {
  userId: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
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

export const getExpressSession = async (
  req: Request | IncomingMessage,
  res: Response | ServerResponse<IncomingMessage>,
  password: string
) => {
  const session = await getIronSession<TSession>(req, res, {
    ...sessionOptions,
    password,
  });

  if (!session.isLoggedIn) {
    session.userId = defaultSession.userId;
    session.isLoggedIn = defaultSession.isLoggedIn;
    return session;
  } else {
    return session;
  }
};
