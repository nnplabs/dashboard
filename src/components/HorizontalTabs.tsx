import classNames from "classnames";

export type HorizontalTabType = "ALL" | "LIVE";
export type HorizontalTabGroupProps = {
  selectedTab: HorizontalTabType;
  allTabs: HorizontalTabData[];
};

export function HorizontalTabGroup({
  allTabs,
  selectedTab,
}: HorizontalTabGroupProps) {
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {allTabs.map(({ onClick, tab }) => (
          <HorizontalTab
            tab={tab}
            onClick={onClick}
            isSelected={selectedTab === tab}
          />
        ))}
      </ul>
    </div>
  );
}

export type HorizontalTabData = {
  tab: HorizontalTabType;
  onClick: () => void;
};

export type HorizontalTabProps = HorizontalTabData & {
  isSelected: boolean;
};

function HorizontalTab({ tab, onClick, isSelected }: HorizontalTabProps) {
  return (
    <li className="w-[240px]">
      <button
        onClick={onClick}
        className={classNames(
          "block text-base p-4 rounded-t-lg border-b-2 w-full",
          {
            "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300":
              !isSelected,
            "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500":
              isSelected,
          }
        )}
      >
        {tab}
      </button>
    </li>
  );
}
