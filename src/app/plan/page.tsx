"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import AdPlan from "../module/AdPlan";
import AddNewClient from "../module/AddNewClient";
import { useEffect, useState } from "react";
import { fetchClients } from "@/redux/features/projectsSlice";
import { useDispatch } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiFolderUserLight, PiSpinner } from "react-icons/pi";
import ClientSkeleton from "../components/ClientSkeleton";

export default function Home() {
  const { clients, loading } = useAppSelector((state) => state.projectReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      (!clients || clients?.length == 0) && (await dispatch(fetchClients()));
    })();
  }, []);

  return (
    <main className="pt-5 pb-10 px-5 lg:px-10">
      <div className="justify-between bg-white rounded-md py-5 px-10 flex">
        <h1 className="pb-2">Planning Dashboard</h1>
        <div>
          <AddNewClient />
        </div>
      </div>
      {!loading && (
        <div
          id="dashboard-container"
          className="my-10 pt-8 pb-2 px-10 bg-white rounded-md"
        >
          {clients?.map((client, i) => {
            return <AdPlan key={i} item={client}></AdPlan>;
          })}

          {(!clients || clients?.length == 0) &&
            !loading &&
            loading != undefined && (
              <div className="my-10 flex items-center gap-4">
                <span className="text-4xl">
                  <PiFolderUserLight />
                </span>
                <p className="text-lg">
                  There are no clients yet, <strong>Add New Client</strong> to
                  get started.
                </p>
              </div>
            )}
        </div>
      )}

      {loading && <ClientSkeleton />}
    </main>
  );
}
