import classNames from "classnames";
import { useState } from "react";
import { Images } from "../images";

export type VerticalTabType = "EMAIL" | "IN-APP" | "OTHERS";
export type VerticalTabGroupProps = {
  selectedTab: (tab: VerticalTabType) => void
};

const allChannels: VerticalTabData[] = [
  {
    tab: "EMAIL",
    imgSrc: Images.Nav.Mail,
  },
  {
    tab: "IN-APP",
    imgSrc: Images.Nav.InApp,
  },
  {
    tab: "OTHERS",
    imgSrc: Images.Nav.Other,
  },
];

export function VerticalTabGroup({selectedTab}: VerticalTabGroupProps) {
  const [channel, setSelectedChannel] = useState<VerticalTabType>('EMAIL');
  return (
    <div className="text-sm w-[120px] h-full font-medium text-center bg-white text-gray-500 border-r border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-col flex-wrap -mb-px">
        {allChannels.map(({ tab, imgSrc }) => (
          <VerticalTab
            tab={tab}
            imgSrc={imgSrc}
            onClick={() => {setSelectedChannel(tab); selectedTab(tab)}}
            isSelected={channel === tab}
          />
        ))}
      </ul>
    </div>
  );
}

export type VerticalTabData = {
  tab: VerticalTabType;
  imgSrc: string;
};

export type VerticalTabProps = VerticalTabData & {
  onClick: ()=> void;
  isSelected: boolean;
};

function VerticalTab({ tab, onClick, isSelected, imgSrc }: VerticalTabProps) {
  return (
    <li className="w-[120px] h-[72px] my-4">
      <button
        onClick={onClick}
        className={classNames("text-base p-4 border-r-2 w-full", {
          "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300":
            !isSelected,
          "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500":
            isSelected,
        })}
      >
        {" "}
        <div className="w-full flex flex-col items-center">
          <img src={imgSrc} className="mb-1 h-5 w-5" />
          {tab}
        </div>
      </button>
    </li>
  );
}
