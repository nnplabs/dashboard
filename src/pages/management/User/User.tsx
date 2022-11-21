import { CircularProgress } from "@mui/material";
import classNames from "classnames";
import dateFormat from "dateformat";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { BodyLayout } from "../../../components/BodyLayout";
import Navbar from "../../../components/Navbar";
import { Page } from "../../../components/Page";
import { PageTopBar } from "../../../components/PageTopBar";
import { useAppContext } from "../../../context/AppContext";
import { useGetAllUsers } from "../../../hooks/useUser";
import { UserData } from "../../../types/api/user";
import sliceString from "../../../utils/sliceString";

function User() {
  const app = useAppContext();
  const { data, isLoading } = useGetAllUsers(app?.selectedApp?.name ?? "");

  useEffect(() => {
    console.log(data, isLoading);
  }, [data, isLoading]);

  return (
    <BodyLayout>
      <Navbar selectedTab="Users" />
      <Page>
        <PageTopBar title="Users" subTitle="Management >" />
        <div className="h-full bg-white mx-10 mb-10 mt-14 rounded-md">
          <div className="overflow-y-scroll relative h-full flex">
            {isLoading ? (
              <div className="m-auto flex">
                <CircularProgress />
              </div>
            ) : (
              <table className="w-full h-fit text-sm text-left text-gray-500 ">
                <UserTableHead />
                <tbody className="text-sm">
                  {data?.map((user) => {
                    return <UserTableRow user={user} />;
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Page>
    </BodyLayout>
  );
}

function UserTableHead() {
  return (
    <thead className=" text-gray-700 uppercase bg-white border-b-2 py-4">
      <tr>
        <th scope="col" className="py-5 w-[25%] text-center pl-4">
          Wallet Address
        </th>
        <th scope="col" className="py-5 w-[25%] text-center">
          Last Updated
        </th>
        <th scope="col" className="py-5 w-[25%] text-center">
          Email
        </th>
        <th scope="col" className="py-5 w-[25%] text-center">
          Telegram
        </th>
      </tr>
    </thead>
  );
}

function UserTableRow({ user }: { user: UserData }) {
  let parsedWallet = user.walletAddress ?? "";
  if (!user.walletAddress.includes(".")) {
    parsedWallet = sliceString(parsedWallet);
  }
  return (
    <tr className="bg-white border-b-[1px]">
      <td
        className="py-4 w-[25%] text-center cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(user.walletAddress);
          toast.info("Wallet Address Copied!", {position: 'bottom-center'})
        }}
      >
        {parsedWallet}
      </td>
      <td className="py-4 w-[25%] text-center">
        {dateFormat(user.updatedAt, "dd-mm-yyyy, h:MM TT")}
      </td>
      <td className="py-4 w-[25%] text-center">
        {<LiveBadge isConnected={!!user.email} />}
      </td>
      <td className="py-4 w-[25%] text-center">
        {<LiveBadge isConnected={user.telegramData.length > 0} />}
      </td>
    </tr>
  );
}

function LiveBadge({ isConnected }: { isConnected: boolean }) {
  return (
    <div
      className={classNames("inline-block text-xs font-semibold w-max p-1", {
        "text-green-700  bg-green-100": isConnected,
        "text-orange-700  bg-orange-100": !isConnected,
      })}
    >
      {isConnected ? `CONNECTED` : `NOT CONNECTED`}
    </div>
  );
}
export default User;
