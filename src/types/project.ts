import CampaignItems, { campaignID } from "./campaigns";
import PlanItems, { planID } from "./planItems";

type ProjectItems = {
  _project_id: string;
  title: string;
  campaigns?: Array<CampaignItems>;
  plans?: Array<PlanItems>;
};

export default ProjectItems;

export type RemoveCampaign = {
  _project_id: string;
  campaigns?: Array<campaignID>;
};

export type RemovePlan = {
  _project_id: string;
  plans?: Array<planID>;
};
