import ProjectItems, { RemoveCampaign, RemovePlan } from "@/types/project";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  clients: Array<ProjectItems>;
  loading?: Boolean;
};

const initialState = {} as InitialState;

export const fetchClients = createAsyncThunk(
  "addashboard/clients",
  async () => {
    // keep this fetch logic different from other fetch so as to leverage revalidate functionality in nextjs
    const response: InitialState = await fetch("/api/clients", {
      next: { revalidate: 600 },
    }).then((data) => data.json());
    return response.clients;
  }
);

export const addClient = createAsyncThunk(
  "addashboard/addclient",
  async (clients: InitialState) => {
    const response: InitialState = await fetch("/api/addclient", {
      method: "POST",
      body: JSON.stringify(clients),
    }).then((data) => data.json());

    const allClients = await fetchAllItems();
    return allClients;
  }
);

export const updCampaign = createAsyncThunk(
  "addashboard/addupdatecampaign",
  async (clients: InitialState) => {
    const response: InitialState = await fetch("/api/addupdatecampaign", {
      method: "POST",
      body: JSON.stringify(clients),
    }).then((data) => data.json());

    const allClients = await fetchAllItems();
    return allClients;
  }
);

export const addupdateplan = createAsyncThunk(
  "addashboard/addupdateplan",
  async (clients: InitialState) => {
    const response: InitialState = await fetch("/api/addupdateplan", {
      method: "POST",
      body: JSON.stringify(clients),
    }).then((data) => data.json());

    const allClients = await fetchAllItems();
    return allClients;
  }
);

export const removeClient = createAsyncThunk(
  "addashboard/removeClient",
  async (projectID: String) => {
    const response: InitialState = await fetch(
      "/api/removeclient/" + projectID,
      {
        method: "PUT",
      }
    ).then((data) => data.json());
    const allClients = await fetchAllItems();
    return allClients;
  }
);

export const removeCampaign = createAsyncThunk(
  "addashboard/removeCampaign",
  async (clients: RemoveCampaign) => {
    const response: InitialState = await fetch(
      "/api/removecampaign/" +
        clients._project_id +
        "/" +
        clients.campaigns[0]._campaign_id,
      {
        method: "PUT",
      }
    ).then((data) => data.json());
    const allClients = await fetchAllItems();
    return allClients;
  }
);

export const removePlan = createAsyncThunk(
  "addashboard/removePlan",
  async (clients: RemovePlan) => {
    const response: InitialState = await fetch(
      "/api/removeplan/" +
        clients._project_id +
        "/" +
        clients.plans[0]._plan_id,
      {
        method: "PUT",
      }
    ).then((data) => data.json());
    const allClients = await fetchAllItems();
    return allClients;
  }
);

export const clients = createSlice({
  name: "clients",
  initialState,
  reducers: {
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
    /*
     * Handle promises for fetching all client
     */
    builder.addCase(fetchClients.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(fetchClients.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.clients = payload;
      return state;
    });

    /*
     * Handle promise when adding a new client
     */
    builder.addCase(addClient.fulfilled, (state, { payload }) => {
      state.clients = payload;
      return state;
    });

    /*
     * Handle promise when removing a client
     */
    builder.addCase(removeClient.fulfilled, (state, { payload }) => {
      state.clients = payload;
      return state;
    });

    /*
     * Handle promise when removing a campaign
     */
    builder.addCase(removeCampaign.fulfilled, (state, { payload }) => {
      state.clients = payload;
      return state;
    });

    /*
     * Handle promise when removing a plan
     */
    builder.addCase(removePlan.fulfilled, (state, { payload }) => {
      state.clients = payload;
      return state;
    });

    /*
     * Handle promises for Campaign updates
     */
    builder.addCase(updCampaign.pending, (state) => {
      state.loading = false;
      return state;
    });

    builder.addCase(updCampaign.fulfilled, (state, { payload }) => {
      state.clients = payload;
      state.loading = false;
      return state;
    });

    /*
     * Handle promises for Plan updates
     */
    builder.addCase(addupdateplan.pending, (state) => {
      state.loading = false;
      return state;
    });

    builder.addCase(addupdateplan.fulfilled, (state, { payload }) => {
      state.clients = payload;
      state.loading = false;
      return state;
    });
  },
});

/*
 * Helper method to fetch all clients
 */
const fetchAllItems = async () => {
  const response: InitialState = await fetch("/api/clients", {
    next: { revalidate: 0 },
  }).then((data) => data.json());
  return response.clients;
};

export const { addUpdCampaign, addUpdPlan } = clients.actions;
export default clients.reducer;
