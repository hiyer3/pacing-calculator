import ProjectItems from "@/types/project";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  clients: Array<ProjectItems>;
  loading?: Boolean;
};

const initialState = {} as InitialState;

export const fetchClients = createAsyncThunk(
  "addashboard/clients",
  async () => {
    const allClients = fetchAllItems();
    return allClients;
  }
);

export const addClient = createAsyncThunk(
  "addashboard/addupdclient",
  async (clients: InitialState) => {
    const response: InitialState = await fetch("/api/addupdclient", {
      method: "POST",
      body: JSON.stringify(clients),
    }).then((data) => data.json());

    const allClients = fetchAllItems();
    return allClients;
  }
);

export const clients = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addNewProject: (state, action: PayloadAction<InitialState>) => {
      //do not add if Project already exists in store
      if (
        state.clients?.find(
          (project) => project.title === action.payload.clients[0].title
        )
      ) {
        return;
      }

      if (!state.clients) {
        return {
          clients: [action.payload.clients[0]],
        };
      }

      return {
        clients: [...state?.clients, action.payload.clients[0]],
      };
    },

    addUpdCampaign: (state, action: PayloadAction<InitialState>) => {
      const index = state.clients?.findIndex((project) => {
        return project._project_id == action.payload.clients[0]._project_id;
      });

      // Initialize campaigns if its the first time
      if (!state.clients[index]?.campaigns) state.clients[index].campaigns = [];

      // Update campaign if it already exists
      const campaignIndex = state.clients[index]?.campaigns.findIndex(
        (campaign) => {
          return (
            campaign._campaign_id ==
            action.payload.clients[0].campaigns[0]._campaign_id
          );
        }
      );

      if (campaignIndex >= 0) {
        state.clients[index].campaigns[campaignIndex] =
          action.payload.clients[0].campaigns[0];
        return;
      }

      // add a new campaign
      state.clients[index].campaigns.push(
        action.payload.clients[0].campaigns[0]
      );
    },

    addUpdPlan: (state, action: PayloadAction<InitialState>) => {
      const index = state.clients?.findIndex((project) => {
        return project._project_id == action.payload.clients[0]._project_id;
      });

      // Initialize plans if its the first time
      if (!state.clients[index]?.plans) state.clients[index].plans = [];

      // Update plan if it already exists
      const planIndex = state.clients[index]?.plans.findIndex((plan) => {
        return plan._plan_id == action.payload.clients[0].plans[0]._plan_id;
      });

      if (planIndex >= 0) {
        state.clients[index].plans[planIndex] =
          action.payload.clients[0].plans[0];
        return;
      }

      // add a new plan
      state.clients[index].plans.push(action.payload.clients[0].plans[0]);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchClients.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(fetchClients.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.clients = payload;
      return state;
    });

    builder.addCase(addClient.fulfilled, (state, { payload }) => {
      state.clients = payload;
      return state;
    });
  },
});

const fetchAllItems = async () => {
  const response: InitialState = await fetch("/api/clients").then((data) =>
    data.json()
  );
  return response.clients;
};

export const { addNewProject, addUpdCampaign, addUpdPlan } = clients.actions;
export default clients.reducer;
