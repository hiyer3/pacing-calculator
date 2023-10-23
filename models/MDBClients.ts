import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
  {
    _project_id: String,
    title: String,
    campaigns: {
      type: [
        {
          _campaign_id: { type: String },
          title: { type: String },
          source: { type: String },
          startDate: { type: String },
          endDate: { type: String },
          grossBudget: { type: Number },
          commissions: { type: Number },
          pacing: { type: String },
          result: { type: Number },
        },
      ],
    },
    plans: {
      type: [
        {
          _plan_id: { type: String },
          planname: { type: String },
          platform: { type: String },
          adtype: { type: String },
          grossspend: { type: String },
          commissions: { type: Number },
          netspend: { type: Number },
          impression: { type: Number },
          cpm: { type: Number },
          clicks: { type: Number },
          cpc: { type: Number },
          reach: { type: Number },
        },
      ],
    },
  },
  { timestamps: true }
);

const MDBClient =
  mongoose.models.Client || mongoose.model("Client", clientSchema);

export default MDBClient;
