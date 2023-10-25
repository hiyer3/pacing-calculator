"use client";

import Button from "@/app/components/Button";
import { addupdateplan, removePlan } from "@/redux/features/projectsSlice";
import { AppDispatch } from "@/redux/store";
import ProjectItems from "@/types/project";
import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { v1 as uuidv1 } from "uuid";

type props = {
  projectItems: ProjectItems;
  onPlanAdded?: Function;
  className?: string;
};

type formErrors = {
  planName: string | null;
  platform: string | null;
  adCampaignType: string | null;
  grossSpend: string | null;
  commissions: string | null;
  netSpend: string | null;
  impression: string | null;
  CPM: string | null;
  clicks: string | null;
  CPC: string | null;
  reach: string | null;
};

const AddEditNewPlan = (props: props) => {
  const ErrorMessageInit = {
    planName: null,
    platform: null,
    adCampaignType: null,
    grossSpend: null,
    commissions: null,
    netSpend: null,
    impression: null,
    CPM: null,
    clicks: null,
    CPC: null,
    reach: null,
  };

  const [planName, setPlanName] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [adCampaignType, setCampaignType] = useState<string>("Awareness");
  const [grossSpend, setgrossSpend] = useState<number>();
  const [commissions, setCommissions] = useState<number>();
  const [netSpend, setNetSpend] = useState<number>();
  const [impression, setImpression] = useState<number>();
  const [CPM, setCPM] = useState<number>();
  const [clicks, setClicks] = useState<number>();
  const [CPC, setCPC] = useState<number>();
  const [reach, setReach] = useState<number>();

  const [errorMessages, setErrorMessages] =
    useState<formErrors>(ErrorMessageInit);
  const [formError, setFormError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const plan = props.projectItems?.plans && props.projectItems.plans[0];

  useEffect(() => {
    if (plan) {
      setToggleEditSavePlan(true);
    }
  }, []);

  /*
   * edit / add new campaign State
   */
  const [toggleEditSavePlan, setToggleEditSavePlan] = useState(false);

  /*
   * Comission change handler
   */
  const onCommissionsChange = (ev) => {
    const commissions = ev.target.value;
    if (commissions < 0 || commissions > 100) return;
    setCommissions(ev.target.value);
  };

  const isFormValid = () => {
    //set error messages

    if (planName.trim().length == 0) {
      setErrorMessages((prevErrorMessages) => {
        prevErrorMessages.planName = "Enter Plan name.";
        return prevErrorMessages;
      });
      setFormError(true);
      return false;
    }

    if (platform.trim().length == 0) {
      setErrorMessages((prevErrorMessages) => {
        prevErrorMessages.platform = "Select Platform";
        return prevErrorMessages;
      });
      setFormError(true);
      return false;
    }

    if (grossSpend <= 0) {
      setErrorMessages((prevErrorMessages) => {
        prevErrorMessages.grossSpend = "Gross budget should be greater than 0.";
        return prevErrorMessages;
      });
      setFormError(true);
      return false;
    }

    if (commissions?.toString().length == 0) {
      setErrorMessages((prevErrorMessages) => {
        prevErrorMessages.commissions = "Enter Commissions percentage.";
        return prevErrorMessages;
      });
      setFormError(true);
      return false;
    }

    if (commissions < 0) {
      setErrorMessages((prevErrorMessages) => {
        prevErrorMessages.commissions =
          "Enter Commissions percentage greater than 0.";
        return prevErrorMessages;
      });
      setFormError(true);
      return false;
    }

    if (commissions > 100) {
      setErrorMessages((prevErrorMessages) => {
        prevErrorMessages.commissions =
          "Enter Commissions percentage less than 100.";
        return prevErrorMessages;
      });
      setFormError(true);
      return false;
    }

    return true;
  };

  /*
   *  Handle edit / add campaing button click
   */
  const handleEditSave = () => {
    //Edit
    if (toggleEditSavePlan) {
      if (plan) {
        setPlanName(plan.name);
        setPlatform(plan.platform);
        setCampaignType(plan.adtype);
        setgrossSpend(plan.grossspend);
        setCommissions(plan.commissions);
        setNetSpend(plan.netspend);
        setImpression(plan.impression);
        setCPM(plan.cpm);
        setClicks(plan.clicks);
        setCPC(plan.cpc);
        setReach(plan.reach);
      }
      setToggleEditSavePlan(false);
      return;
    }

    //Save
    if (!toggleEditSavePlan) {
      if (!isFormValid()) {
        alert("Check form fields for errors!");
        return;
      }

      const singleProject = {
        clients: [
          {
            _project_id: props.projectItems._project_id,
            title: props.projectItems.title,
            plans: [
              {
                _plan_id: plan?._plan_id ? plan._plan_id : uuidv1(),
                name: planName,
                platform,
                adtype: adCampaignType,
                grossspend: grossSpend,
                commissions,
                netspend: netSpend,
                impression,
                cpm: CPM,
                clicks: clicks,
                cpc: CPC,
                reach,
              },
            ],
          },
        ],
      };
      console.log(singleProject);

      dispatch(addupdateplan(singleProject));
      setToggleEditSavePlan(true);
      props.onPlanAdded();
      return;
    }
  };

  /*
   *  Handle remove plan
   */
  const handleRemovePlan = (_plan_id: string) => {
    const userResponse = confirm(
      "Are you sure, you want to remove plan " +
        plan.name +
        "? (Note: This action is irreversible)"
    );

    if (userResponse) {
      const planToRemove = {
        _project_id: props.projectItems._project_id,
        plans: [
          {
            _plan_id,
          },
        ],
      };
      dispatch(removePlan(planToRemove));
    }
  };

  return (
    <tr className={`${props.className} border-b`}>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap border-r"
      >
        {!toggleEditSavePlan && (
          <div className="relative">
            <input
              type="text"
              value={planName}
              className="block w-40 bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Plan Name"
              onChange={(ev) => setPlanName(ev.target.value)}
            />
            {errorMessages.planName && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.planName}
              </span>
            )}
          </div>
        )}

        {toggleEditSavePlan && plan?.name}
      </td>

      <td className="px-6 py-2 border-r text-center">
        {!toggleEditSavePlan && (
          <div className="relative">
            <input
              type="text"
              value={platform}
              className="block w-40 bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Source"
              onChange={(ev) => setPlatform(ev.target.value)}
            />
            {errorMessages.platform && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.platform}
              </span>
            )}
          </div>
        )}

        {toggleEditSavePlan && plan?.platform}
      </td>

      <td className="px-6 py-2 border-r text-center">
        {!toggleEditSavePlan && (
          <select
            onChange={(ev) => setCampaignType(ev.target.value)}
            value={adCampaignType}
          >
            <option>Traffic</option>
            <option>Awareness</option>
            <option>Conversion</option>
          </select>
        )}

        {toggleEditSavePlan && plan?.adtype}
      </td>

      <td className="px-6 py-2 border-r text-center">
        {!toggleEditSavePlan && (
          <div className="relative w-32">
            <input
              type="number"
              value={grossSpend}
              className="block w-full bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              onChange={(ev) => setgrossSpend(+ev.target.value)}
            />
            <span className="absolute select-none font-bold right-0 top-0 w-10 text-gray-500 h-full flex items-center justify-center text-sm rounded-r-md">
              $
            </span>
            {errorMessages.grossSpend && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.grossSpend}
              </span>
            )}
          </div>
        )}

        {toggleEditSavePlan &&
          plan?.grossspend.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
      </td>

      <td className="px-6 py-2 border-r text-center">
        {!toggleEditSavePlan && (
          <div className="relative w-32">
            <input
              type="number"
              value={commissions}
              min={0.0}
              max={100.0}
              step={0.01}
              onChange={onCommissionsChange}
              className="block w-full bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="0"
            />
            <span className="absolute select-none font-bold right-0 top-0 w-10 text-gray-500 h-full flex items-center justify-center text-sm rounded-r-md">
              %
            </span>
            {errorMessages.commissions && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.commissions}
              </span>
            )}
          </div>
        )}

        {toggleEditSavePlan && plan?.commissions + "%"}
      </td>

      <td className="px-6 py-2 border-r text-center">
        {!toggleEditSavePlan && (
          <div className="relative w-32">
            <input
              type="number"
              value={netSpend}
              className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-7 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="0"
              onChange={(ev) => setNetSpend(+ev.target.value)}
            />
            <span className="absolute select-none font-bold right-0 top-0 w-10 text-gray-500 h-full flex items-center justify-center text-sm rounded-r-md">
              $
            </span>
            {errorMessages.netSpend && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.netSpend}
              </span>
            )}
          </div>
        )}

        {toggleEditSavePlan &&
          plan?.netspend.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
      </td>

      <td className="px-6 py-2 border-r text-center">
        {!toggleEditSavePlan && (
          <div className="relative w-32">
            <input
              type="number"
              value={impression}
              className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-7 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="0"
              onChange={(ev) => setImpression(+ev.target.value)}
            />
            {errorMessages.impression && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.impression}
              </span>
            )}
          </div>
        )}

        {toggleEditSavePlan && plan?.impression.toLocaleString("en-US")}
      </td>

      <td className="px-6 py-2 border-r text-center">
        {!toggleEditSavePlan && (
          <div className="relative w-32">
            <input
              type="number"
              value={CPM}
              className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-7 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="0"
              onChange={(ev) => setCPM(+ev.target.value)}
            />
            {errorMessages.CPM && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.CPM}
              </span>
            )}
          </div>
        )}

        {toggleEditSavePlan && plan?.cpm.toLocaleString("en-US")}
      </td>

      <td className="px-6 py-2 border-r text-center">
        {!toggleEditSavePlan && (
          <div className="relative w-32">
            <input
              type="number"
              value={clicks}
              className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-7 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="0"
              onChange={(ev) => setClicks(+ev.target.value)}
            />
            {errorMessages.impression && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.clicks}
              </span>
            )}
          </div>
        )}

        {toggleEditSavePlan && plan?.clicks.toLocaleString("en-US")}
      </td>

      <td className="px-6 py-2 border-r text-center">
        {!toggleEditSavePlan && (
          <div className="relative w-32">
            <input
              type="number"
              value={CPC}
              className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-7 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="0"
              onChange={(ev) => setCPC(+ev.target.value)}
            />
            {errorMessages.CPC && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.CPC}
              </span>
            )}
          </div>
        )}

        {toggleEditSavePlan && plan?.cpc.toLocaleString("en-US")}
      </td>

      <td className="px-6 py-2 border-r text-center">
        {!toggleEditSavePlan && (
          <div className="relative w-32">
            <input
              type="number"
              value={reach}
              className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-7 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="0"
              onChange={(ev) => setReach(+ev.target.value)}
            />
            {errorMessages.reach && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.reach}
              </span>
            )}
          </div>
        )}

        {toggleEditSavePlan && plan?.reach.toLocaleString("en-US")}
      </td>

      <td className="px-6 py-2 text-center">
        <div className="my-auto flex gap-5 items-center">
          <Button onClick={handleEditSave}>
            {toggleEditSavePlan ? "Edit" : "Save"}
          </Button>

          <Button onClick={() => handleRemovePlan(plan._plan_id)} view="plain">
            <span className="text-red-500 text-lg">
              <TbTrash />
            </span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default AddEditNewPlan;
