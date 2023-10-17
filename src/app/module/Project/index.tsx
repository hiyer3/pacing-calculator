"use client";

import Button from "@/app/components/Button";
import { useState } from "react";
import { MdCampaign } from "react-icons/md";
import AddEditNewCampaign from "../AddEditNewCampaign";
import { useAppSelector } from "@/redux/store";
import CampaignItems from "@/types/campaigns";
import ProjectItems from "@/types/project";

type props = {
  item: ProjectItems;
};

const Project = (props: props) => {
  const ProjectTitle = props.item.title;
  const projectID = useAppSelector((state) => {
    const projctIndex = state.projectReducer.projects.findIndex(
      (project) => project.title === ProjectTitle
    );

    return state.projectReducer.projects[projctIndex]._project_id;
  });

  const [showAddNewCampaign, setShowAddNewCampaign] = useState(false);

  const handleAddNewCampaign = () => {
    setShowAddNewCampaign(true);
  };

  const campaigns = useAppSelector((state) => {
    const projectIndex = state.projectReducer.projects.findIndex(
      (project) => project.title === ProjectTitle
    );

    return state.projectReducer.projects[projectIndex].campaigns;
  });

  const onCampaignAdded = () => {
    setShowAddNewCampaign(false);
  };

  return (
    <div className="mb-20">
      <div className="flex justify-between">
        <h1 className="text-2xl">{ProjectTitle}</h1>
        <Button onClick={handleAddNewCampaign} className="text-xs">
          New Campaign <MdCampaign />
        </Button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full my-5 text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Campaign Name
              </th>
              <th scope="col" className="px-6 py-3">
                Source
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                End Date
              </th>
              <th scope="col" className="px-6 py-3">
                Gross Budget
              </th>
              <th scope="col" className="px-6 py-3">
                Commissions
              </th>
              <th scope="col" className="px-6 py-3">
                Pacing
              </th>
              <th scope="col" className="px-6 py-3">
                Result
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {showAddNewCampaign && (
              <AddEditNewCampaign
                onCampaignAdded={onCampaignAdded}
                ProjectItems={{
                  _project_id: projectID,
                  title: ProjectTitle,
                  campaigns: [],
                }}
              />
            )}

            {campaigns?.map((campaign: CampaignItems, index: number) => {
              return (
                <AddEditNewCampaign
                  key={index}
                  onCampaignAdded={onCampaignAdded}
                  ProjectItems={{
                    _project_id: projectID,
                    title: ProjectTitle,
                    campaigns: [campaign],
                  }}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Project;
