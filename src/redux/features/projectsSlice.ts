import ProjectItems from "@/types/project";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  projects: Array<ProjectItems>;
};

const initialState = {} as InitialState;

export const projects = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addNewProject: (state, action: PayloadAction<InitialState>) => {
      //do not add if Project already exists in store
      if (
        state.projects?.find(
          (project) => project.title === action.payload.projects[0].title
        )
      ) {
        return;
      }

      if (!state.projects) {
        return {
          projects: [action.payload.projects[0]],
        };
      }

      return {
        projects: [...state?.projects, action.payload.projects[0]],
      };
    },

    addUpdCampaign: (state, action: PayloadAction<InitialState>) => {
      const index = state.projects?.findIndex((project) => {
        return project._project_id == action.payload.projects[0]._project_id;
      });

      // Initialize campaigns if its the first time
      if (!state.projects[index]?.campaigns)
        state.projects[index].campaigns = [];

      // Update campaign if it already exists
      const campaignIndex =
      state.projects[index]?.campaigns.findIndex((campaign) => {
        return campaign._campaign_id == action.payload.projects[0].campaigns[0]._campaign_id;
      });

      if (campaignIndex >= 0) {
        state.projects[index].campaigns[campaignIndex] =
          action.payload.projects[0].campaigns[0];
        return;
      }

      // add a new campaign
      state.projects[index].campaigns.push(
        action.payload.projects[0].campaigns[0]
      );
    },
  },
});

export const { addNewProject, addUpdCampaign } = projects.actions;
export default projects.reducer;
