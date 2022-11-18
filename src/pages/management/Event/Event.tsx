import {
  DeleteOutline,
  DeleteOutlined,
  EditOutlined,
  SendOutlined,
  SendSharp,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import dateFormat from "dateformat";
import { useState } from "react";
import { BodyLayout } from "../../../components/BodyLayout";

import Navbar from "../../../components/Navbar";
import { Page } from "../../../components/Page";
import { useAppContext } from "../../../context/AppContext";
import { useEventContext } from "../../../context/EventContext";
import { useAccount } from "../../../hooks/useAccount";
import { useGetAllEvents } from "../../../hooks/useEvent";
import { EventData } from "../../../types/api/event";
import { ChannelType } from "../../../types/provider";
import CreateEventModal from "./CreateEventModal";

function Event() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const app = useAppContext();
  const { data, setData } = useEventContext()!;

  const {
    data: allEvents,
    isFetching,
    isLoading,
  } = useGetAllEvents(app?.selectedApp?.name ?? "");

  console.log(allEvents);

  const handleUpdate = (eventData : EventData) => {
    const updatedData = {...data, currentEvent: eventData};
    setData(updatedData);
    setShow(true);
  }

  const handleClose = () => {
    setData({});
    setShow(false);
  };

  return (
    <BodyLayout>
      <Navbar selectedTab="Events" />
      <Page>
        <div className="flex flex-col h-screen py-8 px-10 bg-gray-100">
          <div className="font-medium text-2xl py-4 text-gray-800">Events</div>
          <div className="px-4 py-4 bg-white h-full flex flex-col">
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
              <CircularProgress />
            ) : (
              <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <EventTableHead />
                  <tbody className="text-sm">
                    {allEvents?.map((e) => {
                      return <EventTableRow eventData={e} handleUpdate={handleUpdate}/>;
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
      </Page>
    </BodyLayout>
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
  handleUpdate: (eventData :EventData) => void;
}

function EventTableRow({ eventData, handleUpdate }: EventTableRowProps) {
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
      <td className="py-4 w-[10%]">$2999</td>
      <td className="py-4 w-[10%] text-right">$2999</td>
      <td className="py-4 w-[20%] text-right pr-3">
        <EditOutlined className="cursor-pointer mr-2" onClick={() => handleUpdate(eventData)}/>
        <SendOutlined className="cursor-pointer mr-2" />
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

export default Event;
