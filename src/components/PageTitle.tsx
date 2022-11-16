import { ReactNode } from "react";

export function PageTitle({ title, subTitle }: { title: ReactNode, subTitle: string }) {
  return (
    <>
      <div className="flex flex-col w-full text-left mx-10 mt-10">
        <div className="font-medium text-base text-gray-500">
            {subTitle}
        </div>
        <div className="font-bold text-3xl text-black">
            {title}
        </div>
      </div>
    </>
  );
}
