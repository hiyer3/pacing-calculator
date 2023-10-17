import CampaignItems from "./campaigns";

type ProjectItems = {
  _project_id: string;
  title: string;
  campaigns?: Array<CampaignItems>;
};

export default ProjectItems;
