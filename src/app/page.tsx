"use client";

import { useDispatch } from "react-redux";
import AddNewClient from "./module/AddNewClient";
import Campaign from "./module/Campaign";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { fetchClients } from "@/redux/features/projectsSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Home() {
  const { clients, loading } = useAppSelector((state) => state.projectReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchClients());
  }, []);

  return (
    <main className="pt-5 pb-10 px-10">
      <div className="justify-between bg-white rounded-md py-5 px-10 flex">
        <h1 className="pb-2">Pacing Dashboard</h1>
        <div>
          <AddNewClient />
        </div>
      </div>
      {!loading && (
        <div
          id="dashboard-container"
          className="my-10 pt-8 pb-2 px-10 bg-white rounded-md"
        >
          {clients?.map((client, i) => (
            <Campaign key={i} item={client}></Campaign>
          ))}

        </div>
      )}

      {loading && (
        <div className="h-full fixed w-full justify-center left-0 top-0 flex items-center">
          <span className="animate-spin text-3xl">
            <AiOutlineLoading3Quarters />
          </span>
        </div>
      )}
    </main>
  );
}
