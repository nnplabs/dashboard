import {
  ChatBubbleOutlined,
  ChatBubbleOutlineOutlined,
  ChatOutlined,
  DeleteOutline,
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
  PhoneIphoneOutlined,
  SendOutlined,
  SendSharp,
} from "@mui/icons-material";
import { CircularProgress, Tooltip } from "@mui/material";
import classNames from "classnames";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { BodyLayout } from "../../../components/BodyLayout";
import { Modal } from "../../../components/Modal";

import Navbar from "../../../components/Navbar";
import { Page } from "../../../components/Page";
import { useAppContext } from "../../../context/AppContext";
import { useEventContext } from "../../../context/EventContext";
import { useAccount } from "../../../hooks/useAccount";
import { useGetAllEvents } from "../../../hooks/useEvent";
import { Images } from "../../../images";
import { EventData } from "../../../types/api/event";
import { ChannelImg, ChannelType } from "../../../types/provider";
import CreateEventModal from "./CreateEventModal";
import AceEditor from "react-ace";
import { PageTopBar } from "../../../components/PageTopBar";
import { toast } from "react-toastify";
import { useSendEvent } from "../../../hooks/useSend";

function Event() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData>();
  const app = useAppContext();
  const { data, setData } = useEventContext()!;

  const {
    data: allEvents,
    isFetching,
    isLoading,
  } = useGetAllEvents(app?.selectedApp?.name ?? "");

  console.log(allEvents);

  const handleUpdate = (eventData: EventData) => {
    const updatedData = { ...data, currentEvent: eventData };
    setData(updatedData);
    setShow(true);
  };

  const handleClose = () => {
    setData({});
    setShow(false);
  };

  return (
    <BodyLayout>
      <Navbar selectedTab="Events" />
      <Page>
        <PageTopBar title="Events" subTitle="Management >" />
        <div className="flex flex-col h-screen pb-8 px-10 mt-14 bg-gray-100">
          <div className="px-4 py-4 bg-white h-full flex flex-col rounded-md">
            <div className="py-2 my-4 flex justify-between">
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-gray-500 focus:outline-none block w-48 p-2 "
                placeholder="Search by name"
              />
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5  mb-2  focus:outline-none "
                onClick={() => setShow(true)}
              >
                <span className="flex justify-center items-center">
                  <i className="text-base pr-1 font-bold material-icons">
                    add_circle
                  </i>
                  New Event
                </span>
              </button>
            </div>
            {isFetching ? (
              <div className="m-auto">
                <CircularProgress />
              </div>
            ) : (
              <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <EventTableHead />
                  <tbody className="text-sm">
                    {allEvents?.map((e) => {
                      return (
                        <EventTableRow
                          eventData={e}
                          handleUpdate={handleUpdate}
                          handleSend={() => setSelectedEvent(e)}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <CreateEventModal
          open={show}
          handleClickOpen={() => setShow(true)}
          handleClose={handleClose}
        />
        {selectedEvent && (
          <Modal onClose={() => setSelectedEvent(undefined)}>
            {(toggle) => (
              <SendEventDialog onCloseHandler={toggle} event={selectedEvent} />
            )}
          </Modal>
        )}
      </Page>
    </BodyLayout>
  );
}

type SendEventDialogProps = {
  onCloseHandler: () => void;
  event: EventData;
};

export function SendEventDialog({
  event,
  onCloseHandler,
}: SendEventDialogProps) {
  const userSample = {
    userWalletAddress: "",
  };

  const { isLoading, sendEvent } = useSendEvent();

  const [data, setData] = useState<string>(JSON.stringify({}, null, "\t"));
  const [user, setUser] = useState<string>(
    JSON.stringify(userSample, null, "\t")
  );

  const app = useAppContext();
  const handleSubmit = async () => {
    let parsedUser, parsedConfig;
    try {
      parsedUser = JSON.parse(user);
      parsedConfig = JSON.parse(data);
    } catch (e) {
      toast.error("Invalid Json Format");
    }

    await sendEvent({
      appName: app?.selectedApp?.name ?? "",
      eventName: event.name,
      userWalletAddress: parsedUser.userWalletAddress,
      data: parsedConfig
    })
  };

  return (
    <div className={"w-[600px] flex flex-col overflow-y-scroll"}>
      <SendEventDialogHeader event={event} onCloseHandler={onCloseHandler} />
      {isLoading ? (
        <div className="h-[600p] flex m-auto">
          <CircularProgress />
        </div>
      ) : (
        <div className="px-7 py-6 w-full h-full">
          <div className="text-black text-base mb-3 font-medium">
            Recepient Details
          </div>
          <AceEditor
            className="max-h-[150px] w-full rounded-md border-[1px] min-w-[540px]"
            mode="json"
            theme="github"
            name="editor"
            value={user}
            showGutter={true}
            onChange={setUser}
            fontSize={14}
            editorProps={{ $blockScrolling: true }}
          />
          <div className="text-black text-base mt-10 mb-3 font-medium">
            Dynamic Data
          </div>
          <AceEditor
            className="max-h-[250px] w-full border-[1px] rounded-md min-w-[540px]"
            mode="json"
            theme="github"
            name="editor"
            value={data}
            showGutter={true}
            onChange={setData}
            fontSize={14}
            editorProps={{ $blockScrolling: true }}
          />
          <div className="flex flex-row justify-end">
            <button
              onClick={handleSubmit}
              type="submit"
              className={classNames(
                "font-medium rounded-lg text-sm px-5 py-2.5 mt-7 focus:outline-none w-fit bg-blue-700 hover:bg-blue-800 text-white"
              )}
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SendEventDialogHeader({
  event,
  onCloseHandler,
}: SendEventDialogProps) {
  return (
    <div className="h-[76px] py-4 px-6 flex flex-row border-b-2 border-b-gray-200 items-center">
      <div className="flex flex-col">
        <div className="text-black text-xl font-medium">{`Send Event: ${event.name}`}</div>
        <div className="text-gray-500 text-sm mt-1 font-normal">
          Add the recepient details and any dynamic data that you wish to send
        </div>
      </div>
      <div className="flex flex-1" />
      <img
        src={Images.Other.CloseIcon}
        className="h-5 w-5 cursor-pointer"
        onClick={onCloseHandler}
      />
    </div>
  );
}

function EventTableHead() {
  return (
    <thead className=" text-gray-700 uppercase bg-white border-2 py-4">
      <tr>
        <th scope="col" className="py-5 w-[20%] pl-4">
          Name
        </th>
        <th scope="col" className="py-5 w-[20%]">
          Description
        </th>
        <th scope="col" className="py-5 w-[20%]">
          Last Updated
        </th>
        <th scope="col" className="py-5 w-[10%]">
          Channels
        </th>
        <th scope="col" className="py-5 w-[10%] text-right">
          Status
        </th>
        <th scope="col" className="py-5 w-[20%] text-right pr-4">
          Actions
        </th>
      </tr>
    </thead>
  );
}

type EventTableRowProps = {
  eventData: EventData;
  handleSend: (eventData: EventData) => void;
  handleUpdate: (eventData: EventData) => void;
};

function EventTableRow({
  eventData,
  handleUpdate,
  handleSend,
}: EventTableRowProps) {
  const channels = eventData.metadata?.channels ?? "";
  const isOnChain =
    (eventData.metadata?.onChain ?? "").toLowerCase() === "true";
  const parsedChannels = channels.split("+") as ChannelType[];

  const imgSrc = {
    MAIL: <Tooltip children={<MailOutlined className="h-2 w-2"/>} title={"MAIL"}/>,
    IN_APP: <Tooltip children={<PhoneIphoneOutlined className="h-2 w-2" />} title={"IN APP"}/>,
    OTHER: <Tooltip children={<ChatBubbleOutlineOutlined className="h-2 w-2" />} title={"OTHER"}/>,
  };

  return (
    <tr className="bg-white border-2">
      <th
        scope="row"
        className="py-4 w-[20%] font-medium text-gray-900 whitespace-nowrap pl-4"
      >
        {eventData.name}
      </th>
      <td className="py-4 w-[20%]">{eventData.metadata?.description ?? ""}</td>
      <td className="py-4 w-[20%]">
        {dateFormat(eventData.updatedAt, "dd-mm-yyyy, h:MM TT")}
      </td>
      <td className="py-4 w-[10%]">
        <div className="flex flex-row items-center">
          {parsedChannels.map((ch) => imgSrc[ch as ChannelType])}
        </div>
      </td>
      <td className="py-4 w-[10%] text-right">
        <LiveBadge isOnChain={isOnChain} />
      </td>
      <td className="py-4 w-[20%] text-right pr-3">
        <EditOutlined
          className="cursor-pointer mr-2"
          onClick={() => handleUpdate(eventData)}
        />
        <SendOutlined
          className="cursor-pointer mr-2"
          onClick={() => handleSend(eventData)}
        />
        <DeleteOutlined className="cursor-pointer" />
      </td>
    </tr>
  );
}

function EmptyRow() {
  return (
    <tr className="bg-white border-2">
      <div className="py-4 flex items-center w-full">
        No data available. Create a new event to start seeing all events here.
      </div>
    </tr>
  );
}

function LiveBadge({ isOnChain }: { isOnChain: boolean }) {
  return (
    <div
      className={classNames("inline-block text-xs font-semibold w-max p-1", {
        "text-green-700  bg-green-100": !isOnChain,
        "text-orange-700  bg-orange-100": isOnChain,
      })}
    >
      {isOnChain ? `ON CHAIN` : `LIVE`}
    </div>
  );
}

export default Event;
