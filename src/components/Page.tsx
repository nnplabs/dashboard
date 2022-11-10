import { ReactNode } from "react";

export function Page({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col h-full w-full p-12">{children}</div>
    </>
  );
}
