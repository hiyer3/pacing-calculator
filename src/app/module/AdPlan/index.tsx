"use client";

import Button from "@/app/components/Button";
import { useState } from "react";
import { TbBusinessplan } from "react-icons/tb";
import { useAppSelector } from "@/redux/store";
import planItems from "@/types/planItems";
import ProjectItems from "@/types/project";
import AddEditNewPlan from "../AddEditNewPlan";

type props = {
  item: ProjectItems;
};

const AdPlan = (props: props) => {
  const [showAddNewPlan, setShowAddNewPlan] = useState(false);

  const ProjectTitle = props.item.title;

  /**
   * Get the project ID to add the plans to a specific project
   */
  const projectID = useAppSelector((state) => {
    const projctIndex = state.projectReducer.clients.findIndex(
      (project) => project.title === ProjectTitle
    );

    return state.projectReducer.clients[projctIndex]._project_id;
  });

  const handleAddNewPlan = () => {
    setShowAddNewPlan(true);
  };

  const plans = useAppSelector((state) => {
    const projectIndex = state.projectReducer.clients.findIndex(
      (project) => project.title === ProjectTitle
    );

    return state.projectReducer.clients[projectIndex].plans;
  });

  const onPlanAdded = () => {
    setShowAddNewPlan(false);
  };

  return (
    <div className="mb-20">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl pl-2">{ProjectTitle}</h1>
        <Button onClick={handleAddNewPlan} className="text-xs">
          New Plan <TbBusinessplan />
        </Button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5">
        <table className="w-full my-5 text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Platform
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Gross Spend
              </th>
              <th scope="col" className="px-6 py-3">
                Commissions
              </th>
              <th scope="col" className="px-6 py-3">
                Net Spend
              </th>
              <th scope="col" className="px-6 py-3">
                Impressions
              </th>
              <th scope="col" className="px-6 py-3">
                Cost per Mille (CPM)
              </th>
              <th scope="col" className="px-6 py-3">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3">
                Cost per Click (CPC)
              </th>
              <th scope="col" className="px-6 py-3">
                Reach
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {plans?.map((plan: planItems, index: number) => {
              return (
                <AddEditNewPlan
                  key={index}
                  onPlanAdded={onPlanAdded}
                  projectItems={{
                    _project_id: projectID,
                    title: ProjectTitle,
                    plans: [plan],
                  }}
                />
              );
            })}

            {showAddNewPlan && (
              <AddEditNewPlan
                onPlanAdded={onPlanAdded}
                projectItems={{
                  _project_id: projectID,
                  title: ProjectTitle,
                  plans: [],
                }}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdPlan;
