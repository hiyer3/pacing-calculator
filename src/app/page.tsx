"use client";

import AddNewClient from "./module/AddNewClient";
import Project from "./module/Project";
import { useAppSelector } from "@/redux/store";

export default function Home() {
  const projects = useAppSelector((state) => state.projectReducer.projects);

  return (
    <main className="p-10">
      <div className="flex justify-between">
        <h1 className="pb-2">Dashboard</h1>
        <div>
          <AddNewClient />
        </div>
      </div>
      <div id="dashboard-container" className="my-10">
        {projects?.map((project, i) => {
          return <Project key={i} item={project}></Project>;
        })}
      </div>
    </main>
  );
}
