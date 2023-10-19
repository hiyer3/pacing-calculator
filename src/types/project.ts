import CampaignItems from "./campaigns";
import PlanItems from "./planItems";

type ProjectItems = {
  _project_id: string;
  title: string;
  campaigns?: Array<CampaignItems>;
  plans?: Array<PlanItems>
};

export default ProjectItems;
