"use client";

import Button from "@/app/components/Button";
import { useState } from "react";
import { MdCampaign } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import AddEditNewCampaign from "../AddEditNewCampaign";
import { AppDispatch, useAppSelector } from "@/redux/store";
import CampaignItems from "@/types/campaigns";
import ProjectItems from "@/types/project";
import { useDispatch } from "react-redux";
import { removeClient } from "@/redux/features/projectsSlice";

type props = {
  item?: ProjectItems;
  loading: Boolean;
};

const Campaign = (props: props) => {
  const dispatch = useDispatch<AppDispatch>();

  const ProjectTitle = props.item?.title;
  const projectID =
    !props.loading &&
    useAppSelector((state) => {
      const projctIndex = state.projectReducer.clients.findIndex(
        (project) => project.title === ProjectTitle
      );

      return state.projectReducer.clients[projctIndex]._project_id;
    });

  const [showAddNewCampaign, setShowAddNewCampaign] = useState(false);

  const handleAddNewCampaign = () => {
    setShowAddNewCampaign(true);
  };

  const campaigns =
    !props.loading &&
    useAppSelector((state) => {
      const projectIndex = state.projectReducer.clients.findIndex(
        (project) => project.title === ProjectTitle
      );

      return state.projectReducer.clients[projectIndex].campaigns;
    });

  const onCampaignAdded = () => {
    setShowAddNewCampaign(false);
  };

  const onRemoveClient = (clientID: string, clientName: string) => {
    const userResponse = confirm(
      "Are you sure, you want to remove " +
        clientName +
        " and all of the associated campaigns and plans? (Note: This action is irreversible)"
    );

    if (userResponse) {
      dispatch(removeClient(clientID));
    }
  };

  return (
    <div className="mb-20 border-b pb-3">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl pl-2">{ProjectTitle}</h1>

        {!props.loading && (
          <Button onClick={handleAddNewCampaign} className="text-xs">
            New Campaign <MdCampaign />
          </Button>
        )}
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5">
        <table className="w-full my-5 text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Campaign Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Source
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                End Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Gross Budget
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Commissions
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Pacing
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Daily Spend
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {!props.loading &&
              campaigns?.map((campaign: CampaignItems, index: number) => {
                return (
                  <AddEditNewCampaign
                    key={index}
                    className={`${index % 2 ? "bg-gray-50" : "bg-white"}`}
                    onCampaignAdded={onCampaignAdded}
                    ProjectItems={{
                      _project_id: projectID,
                      title: ProjectTitle,
                      campaigns: [campaign],
                    }}
                  />
                );
              })}
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
          </tbody>
        </table>
      </div>
      <div className="text-right mt-4">
        <Button
          view="plain"
          title="Remove Client"
          className="text-red-500 text-lg"
          onClick={() =>
            onRemoveClient(props.item._project_id, props.item.title)
          }
        >
          <IoTrash />
        </Button>
      </div>
    </div>
  );
};

export default Campaign;
