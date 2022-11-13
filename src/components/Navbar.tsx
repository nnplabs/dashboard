import classNames from "classnames";
import React, { useState } from "react";
import { Images } from "../images";
import { useNavigate } from "react-router-dom";

type TabType = "Metrics" | "Integrations" | "Logs" | "Settings" | "Events";
const NavData: NavBarGroupData[] = [
  {
    title: "Dashboard",
    navBarItems: [
      {
        title: "Metrics",
        route: "/dashboard/metrics",
        imgSrc: "monitoring",
      },
      {
        title: "Logs",
        route: "/dashboard/logs",
        imgSrc: "description",
      },
    ],
  },
  {
    title: "Management",
    navBarItems: [
      {
        title: "Events",
        route: "/management/events",
        imgSrc: "event",
      },
      {
        title: "Integrations",
        route: "/management/integrations",
        imgSrc: "send",
      },
      {
        title: "Settings",
        route: "/management/settings",
        imgSrc: "settings",
      },
    ],
  },
];

function Navbar({ selectedTab }: { selectedTab: TabType }) {
  return (
    <>
      <div className="overflow-y-auto py-4 px-3 bg-gray-800 rounded h-full w-[300px]">
        <NavBarLogo />
        {NavData.map((data) => {
          return (
            <NavBarGroup
              title={data.title}
              navBarItems={data.navBarItems}
              selectedTab={selectedTab}
            />
          );
        })}
      </div>
    </>
  );
}

function NavBarLogo() {
  return (
    <a href="#" className="flex items-center pl-2.5 mb-5">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="mr-3 h-6 sm:h-7"
        alt="Flowbite Logo"
      />
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        NNP
      </span>
    </a>
  );
}

function NavBarGroup({ navBarItems, title, selectedTab }: NavBarGroupProps) {
  const [show, setShow] = useState<boolean>(true);
  return (
    <>
      <div
        className="flex items-center p-2 w-full text-base font-normal transition duration-75 group text-white"
        onClick={() => setShow((val) => !val)}
      >
        <span className="flex-1 text-left whitespace-nowrap">{title}</span>
      </div>
      {show &&
        navBarItems.map((item) => {
          return <NavbarItem {...item} selectedTab={selectedTab} />;
        })}
      <div className="pt-4 mt-4 space-y-2 border-t border-gray-700"></div>
    </>
  );
}

function NavbarItem({ imgSrc, route, title, selectedTab }: NavBarItemProps) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={classNames(
        "flex items-center p-2 w-full text-base font-normal rounded-lg transition duration-75 group  text-white hover:bg-gray-700",
        {
          "bg-gray-700": title === selectedTab,
        }
      )}
      onClick={() => navigate(route)}
    >
      <i className="material-icons">{imgSrc}</i>
      <span className="mx-3 text-left whitespace-nowrap">{title}</span>
    </button>
  );
}

type NavBarItemData = {
  title: string;
  route: string;
  imgSrc: string;
};

type NavBarItemProps = NavBarItemData & {
  selectedTab: TabType;
};

type NavBarGroupData = {
  title: string;
  navBarItems: NavBarItemData[];
};

type NavBarGroupProps = NavBarGroupData & {
  selectedTab: TabType;
};
export default Navbar;
