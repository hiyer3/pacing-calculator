"use client";

import AddNewClient from "./module/AddNewClient";
import Campaign from "./module/Campaign";
import { useAppSelector } from "@/redux/store";

export default function Home() {
  const clients = useAppSelector((state) => state.projectReducer.projects);

  return (
    <main className="pt-5 pb-10 px-10">
      <div className="justify-between bg-white rounded-md py-5 px-10 flex">
        <h1 className="pb-2">Pacing Dashboard</h1>
        <div>
          <AddNewClient />
        </div>
      </div>
      {clients && (
        <div
          id="dashboard-container"
          className="my-10 pt-8 pb-2 px-10 bg-white rounded-md"
        >
          {clients?.map((client, i) => {
            return <Campaign key={i} item={client}></Campaign>;
          })}
        </div>
      )}
      
    </main>
  );
}