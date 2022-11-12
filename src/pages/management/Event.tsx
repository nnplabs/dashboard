import { useState } from "react";
import { BodyLayout } from "../../components/BodyLayout";
import CreateEventModal from "../../components/CreateEventModal";
import Navbar from "../../components/Navbar";
import { Page } from "../../components/Page";

function Event() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  return (
    <BodyLayout>
      <Navbar selectedTab="Events" />
      <Page>
        <div className="flex flex-col h-screen py-8 px-10 bg-gray-100">
          <div className="font-medium text-2xl py-4 text-gray-800">
            Events
          </div>
          <div className="px-4 py-4 bg-white">
          <div className="py-2 my-4 pr-4 flex justify-between">
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-gray-500 focus:outline-none block w-48 p-2 " placeholder="Search by name" />
            <button
             type="button"
             className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none "
             onClick={() => setShow(true)}>
              <span className="flex justify-center items-center">
                <i className="text-base pr-1 font-bold material-icons">
                  add_circle
                </i>
                New Event
              </span>
            </button>
          </div>
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className=" text-gray-700 uppercase bg-white border-2 py-4">
                  <tr>
                    <th scope="col" className="py-5 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-5 px-6">
                      Description
                    </th>
                    <th scope="col" className="py-5 px-6">
                      Channels
                    </th>
                    <th scope="col" className="py-5 px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="bg-white border-2">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                      Apple MacBook Pro 17"
                    </th>
                    <td className="py-4 px-6">
                      Sliver
                    </td>
                    <td className="py-4 px-6">
                      Laptop
                    </td>
                    <td className="py-4 px-6">
                      $2999
                    </td>
                  </tr>
                  <tr className="bg-white border-2">
                    <div className="py-4 px-6 flex items-center w-full">
                      No data available. Create a new event to start seeing all events here.
                    </div>
                  </tr>
                  <tr className="bg-white border-2">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                      Apple MacBook Pro 17"
                    </th>
                    <td className="py-4 px-6">
                      Sliver
                    </td>
                    <td className="py-4 px-6">
                      Laptop
                    </td>
                    <td className="py-4 px-6">
                      $2999
                    </td>
                  </tr>
                  <tr className="bg-white border-2">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                      Apple MacBook Pro 17"
                    </th>
                    <td className="py-4 px-6">
                      Sliver
                    </td>
                    <td className="py-4 px-6">
                      Laptop
                    </td>
                    <td className="py-4 px-6">
                      $2999
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
        <CreateEventModal open={show} handleClickOpen={() => setShow(true)} handleClose={() => setShow(false)} />
      </Page>
    </BodyLayout>
  );
}

export default Event;
