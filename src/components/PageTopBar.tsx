import { ReactNode } from "react";
import AccountMenu from "./AccountMenu";
import {SelectAppMenu} from "./SelectAppMenu";

export function PageTopBar({
  title,
  subTitle,
}: {
  title: ReactNode;
  subTitle: string;
}) {
  return (
    <div className="flex flex-row px-10 pt-10">
      <div className="flex flex-col text-left ">
        <div className="font-medium text-base text-gray-500">{subTitle}</div>
        <div className="font-bold text-3xl text-black">{title}</div>
      </div>
      <div className="flex flex-grow" />
      <SelectAppMenu />
      <AccountMenu />
    </div>
  );
}