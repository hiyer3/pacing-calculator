type CampaignItems = {
  _campaign_id: string;
  title: string;
  source: string;
  startDate: string;
  endDate: string;
  grossBudget: number;
  commissions: number;
  pacing: string;
  result: number;
};

export default CampaignItems;

export type campaignID = {
  _campaign_id: string;
}