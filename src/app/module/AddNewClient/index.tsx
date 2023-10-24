"use client";

import Button from "@/app/components/Button";
import { useState } from "react";
import { HiUserAdd, HiX } from "react-icons/hi";
import { AiOutlineUserAdd, AiOutlineClose } from "react-icons/ai";
import { Toast } from "flowbite-react";
import { addClient } from "@/redux/features/projectsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { v1 as uuidv1 } from "uuid";

const AddNewClient = () => {
  const { clients } = useAppSelector((state) => state.projectReducer);
  const dispatch = useDispatch<AppDispatch>();

  const [clientName, setClientName] = useState("");
  const [showAddNewClient, setShowAddNewClient] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleAddNewClient = () => {
    setShowAddNewClient(true);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    setFormError(false);

    clients.forEach((client) => {
      if (client.title == clientName) {
        setShowToast(true);
        setFormError((prev) => true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
        return;
      }
    });
    
    !formError &&
      dispatch(
        addClient({
          clients: [
            {
              _project_id: uuidv1(),
              title: clientName,
            },
          ],
        })
      );
    setShowAddNewClient(false);
  };

  return (
    <div
      className={`transition-all ease-linear ${
        showAddNewClient && "mb-[220px]"
      }`}
    >
      <Button
        view="large"
        disabled={showAddNewClient}
        onClick={handleAddNewClient}
      >
        Add New Client <HiUserAdd />
      </Button>

      {showAddNewClient && (
        <div className="transition-all ease-linear absolute left-0 h-[200px] w-full flex flex-col items-center justify-center">
          <button
            onClick={() => setShowAddNewClient(false)}
            className="absolute text-red-500 text-2xl hover:cursor-pointer right-12 top-5"
          >
            <AiOutlineClose />
          </button>
          <form onSubmit={onSubmit}>
            <div className="flex gap-3">
              <div className="py-4 items-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Client Name
                </label>
                <div className="relative w-96">
                  <input
                    type="text"
                    className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Client Name"
                    onChange={(ev) => setClientName(ev.target.value)}
                    required
                  />
                  <span className="absolute right-0 top-0 w-10 h-full flex items-center justify-center">
                    <AiOutlineUserAdd />
                  </span>
                </div>
              </div>

              <div className="flex items-end mb-2">
                <button
                  type="submit"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Add Client
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {showToast && (
        <Toast
          className={`${
            showToast ? "opacity-100" : "opacity-0"
          } fixed left-5 bottom-20`}
        >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-auto text-sm font-normal">
            Client already exist.
          </div>
          <Toast.Toggle />
        </Toast>
      )}
    </div>
  );
};

export default AddNewClient;
