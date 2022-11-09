import { ReactNode } from "react";

export function BodyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-row h-full w-full">{children}</div>
    </>
  );
}
