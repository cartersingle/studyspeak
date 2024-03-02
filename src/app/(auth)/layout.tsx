import type { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center pt-10">{children}</div>
  );
};

export default AuthLayout;
