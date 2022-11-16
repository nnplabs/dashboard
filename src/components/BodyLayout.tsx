import classnames from "classnames";
import { ReactNode } from "react";

export function BodyLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className={classnames("flex flex-row h-full w-full", className)}>
        {children}
      </div>
    </>
  );
}
