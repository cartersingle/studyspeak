import { Recorder } from "@/components/recorder";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const Record = async () => {
  const { isLoggedIn } = await getSession();

  if (!isLoggedIn) return redirect("/");

  return <Recorder />;
};

export default Record;
