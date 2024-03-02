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
