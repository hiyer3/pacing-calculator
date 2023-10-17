"use client";

import Button from "@/app/components/Button";
import { addUpdCampaign } from "@/redux/features/projectsSlice";
import { AppDispatch } from "@/redux/store";
import ProjectItems from "@/types/project";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v1 as uuidv1 } from "uuid";

type props = {
  ProjectItems: ProjectItems;
  onCampaignAdded?: Function;
};

type formErrors = {
  campaignName: string | null;
  campaignSource: string | null;
  startDate: string | null;
  endDate: string | null;
  grossBudget: string | null;
  commissions: string | null;
};

const AddEditNewCampaign = (props: props) => {
  const ErrorMessageInit = {
    campaignName: null,
    campaignSource: null,
    startDate: null,
    endDate: null,
    grossBudget: null,
    commissions: null,
  };

  const [campaignName, setCampaignName] = useState<string>("");
  const [campaignSource, setCampaignSource] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [campaignDays, setCampaignDays] = useState<number>(0);
  const [grossBudget, setGrossBudget] = useState<number>();
  const [commissions, setCommissions] = useState<number>();
  const [pacing, setPacing] = useState<string>("Even");
  const [result, setResult] = useState<number>(0);
  const [errorMessages, setErrorMessages] =
    useState<formErrors>(ErrorMessageInit);
  const [formError, setFormError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  //const projects = useAppSelector((state) => state.projectReducer.projects);
  const campaign =
    props.ProjectItems?.campaigns && props.ProjectItems.campaigns[0];

  useEffect(() => {
    if (campaign) {
      setToggleEditSaveCampaign(true);
    }
  }, []);

  /*
   * edit / add new campaign State
   */
  const [toggleEditSaveCampaign, setToggleEditSaveCampaign] = useState(false);

  const onCommissionsChange = (ev) => {
    const commissions = ev.target.value;
    if (commissions < 0 || commissions > 100) return;
    setCommissions(ev.target.value);
  };

  let startDateTemp: Date;
  let endDateTemp: Date;

  useEffect(() => {
    startDateTemp = new Date(startDate.toString());
    endDateTemp = new Date(endDate.toString());

    if (!endDateTemp || !endDateTemp) {
      setCampaignDays(0);
    } else {
      setCampaignDays(
        Math.ceil(
          (endDateTemp.valueOf() - startDateTemp.valueOf()) /
            (1000 * 60 * 60 * 24)
        )
      );
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setFormError(false);
    setErrorMessages(ErrorMessageInit);

    //console.log(isFormValid(), (grossBudget * commissions) / campaignDays);
    if (!isFormValid()) {
      return;
    }

    setFormError(false);

    setResult(+((grossBudget * commissions) / campaignDays).toFixed(2));
  }, [
    campaignName,
    campaignSource,
    grossBudget,
    commissions,
    startDate,
    endDate,
  ]);

  const isFormValid = () => {
    //set error messages

    if (campaignName.trim().length == 0) {
      setErrorMessages((prevErrorMessages) => {
        prevErrorMessages.campaignName = "Enter campaign name.";
        return prevErrorMessages;
      });
      setFormError(true);
      return false;
    }

    if (campaignSource.trim().length == 0) {
      setErrorMessages((prevErrorMessages) => {
        prevErrorMessages.campaignSource = "Enter campaign source.";
        return prevErrorMessages;
      });
      setFormError(true);
      return false;
    }

    if (grossBudget <= 0) {
      setErrorMessages((prevErrorMessages) => {
        prevErrorMessages.grossBudget = "Enter budget greater than 0.";
        return prevErrorMessages;
      });
      setFormError(true);
      return false;
    }

    startDateTemp = new Date(startDate.toString());
    endDateTemp = new Date(endDate.toString());

    if (startDateTemp > endDateTemp) {
      setErrorMessages((prevErrorMessages) => {
        prevErrorMessages.startDate =
          "Start date cannot be greater than end date.";
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
    if (toggleEditSaveCampaign) {
      if (campaign) {
        setCampaignName(campaign.title);
        setCampaignSource(campaign.source);
        setStartDate(campaign.startDate);
        setEndDate(campaign.endDate);
        setGrossBudget(campaign.grossBudget);
        setCommissions(campaign.commissions);
        setPacing(campaign.pacing);
        setResult(campaign.result);
      }
      setToggleEditSaveCampaign(false);
      return;
    }

    //Save
    if (!toggleEditSaveCampaign) {
      if (!isFormValid()) {
        alert("Check form fields for errors!");
        return;
      }

      const singleProject = {
        projects: [
          {
            _project_id: props.ProjectItems._project_id,
            title: props.ProjectItems.title,
            campaigns: [
              {
                _campaign_id: campaign?._campaign_id
                  ? campaign._campaign_id
                  : uuidv1(),
                title: campaignName,
                source: campaignSource,
                startDate,
                endDate,
                grossBudget,
                commissions,
                pacing,
                result,
              },
            ],
          },
        ],
      };
      console.log(singleProject);

      dispatch(addUpdCampaign(singleProject));
      setToggleEditSaveCampaign(true);
      props.onCampaignAdded();

      return;
    }
  };

  return (
    <tr className="bg-white border-b h-32">
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {!toggleEditSaveCampaign && (
          <div className="relative">
            <input
              type="text"
              value={campaignName}
              className="block w-40 bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Campaign Name"
              onChange={(ev) => setCampaignName(ev.target.value)}
            />
            {errorMessages.campaignName && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.campaignName}
              </span>
            )}
          </div>
        )}

        {toggleEditSaveCampaign && campaign?.title}
      </td>
      <td className="px-6 py-4">
        {!toggleEditSaveCampaign && (
          <div className="relative">
            <input
              type="text"
              value={campaignSource}
              className="block w-40 bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Source"
              onChange={(ev) => setCampaignSource(ev.target.value)}
            />
            {errorMessages.campaignSource && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.campaignSource}
              </span>
            )}
          </div>
        )}

        {toggleEditSaveCampaign && campaign?.source}
      </td>
      <td className="px-6 py-4">
        {!toggleEditSaveCampaign && (
          <div className="relative">
            <input
              type="date"
              value={startDate}
              className="block w-40 bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              onChange={(ev) => setStartDate(ev.target.value)}
            />
            {errorMessages.startDate && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.startDate}
              </span>
            )}
          </div>
        )}

        {toggleEditSaveCampaign && campaign?.startDate}
      </td>
      <td className="px-6 py-4">
        {!toggleEditSaveCampaign && (
          <div className="relative">
            <input
              type="date"
              value={endDate}
              className="block w-40 bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              onChange={(ev) => setEndDate(ev.target.value)}
            />
            {errorMessages.endDate && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.endDate}
              </span>
            )}
          </div>
        )}

        {toggleEditSaveCampaign && campaign?.endDate}
      </td>
      <td className="px-6 py-4">
        {!toggleEditSaveCampaign && (
          <div className="relative w-32">
            <input
              type="number"
              value={grossBudget}
              className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-7 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="0"
              onChange={(ev) => setGrossBudget(+ev.target.value)}
            />
            <span className="absolute select-none font-bold right-0 top-0 w-10 text-gray-500 h-full flex items-center justify-center text-sm rounded-r-md">
              $
            </span>
            {errorMessages.grossBudget && (
              <span className="text-red-600 text-xs -bottom-10 font-medium absolute">
                {errorMessages.grossBudget}
              </span>
            )}
          </div>
        )}

        {toggleEditSaveCampaign &&
          campaign?.grossBudget.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
      </td>
      <td className="px-6 py-4">
        {!toggleEditSaveCampaign && (
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

        {toggleEditSaveCampaign &&
          campaign?.commissions.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }) + "%"}
      </td>
      <td className="px-6 py-4">
        {!toggleEditSaveCampaign && (
          <select onChange={(ev) => setPacing(ev.target.value)} value={pacing}>
            <option>Fast</option>
            <option>Even</option>
            <option>Slow</option>
          </select>
        )}

        {toggleEditSaveCampaign && campaign?.pacing}
      </td>
      <td className="px-6 py-4">
        {result
          ? result.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          : campaign?.result.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
      </td>
      <td className="px-6 py-4">
        <Button onClick={handleEditSave}>
          {toggleEditSaveCampaign ? "Edit" : "Save"}
        </Button>
      </td>
    </tr>
  );
};

export default AddEditNewCampaign;
