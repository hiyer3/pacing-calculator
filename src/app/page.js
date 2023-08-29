"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndtDate] = useState("");
  const [campaignDays, setCampaignDays] = useState(0);
  const [grossBudget, setGrossBudget] = useState(0);
  const [comissions, setCommissions] = useState(0);
  const [result, setResult] = useState(0);

  const onCommissionsChange = (ev) => {
    const comissions = ev.target.value;
    if (comissions < 0 || comissions > 100) return;
    setCommissions(ev.target.value);
  };

  useEffect(() => {
    const startDateTemp = new Date(startDate);
    const endDateTemp = new Date(endDate);

    if (!endDateTemp || !endDateTemp) {
      setCampaignDays(0);
    } else {
      setCampaignDays(
        Math.ceil((endDateTemp - startDateTemp) / (1000 * 60 * 60 * 24))
      );
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setResult((grossBudget * comissions) / campaignDays);
  }, [grossBudget, comissions, startDate, endDate]);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1>Calculator</h1>

      <form>
        <div className="flex gap-5">
          <div className="py-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlhtmlFor="username"
            >
              Start Date
            </label>
            <input
              type="date"
              className="block w-96 bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              onChange={(ev) => setStartDate(ev.target.value)}
            />
          </div>

          <div className="py-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlhtmlFor="username"
            >
              Start Date
            </label>
            <input
              type="date"
              className="block w-96 bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              onChange={(ev) => setEndtDate(ev.target.value)}
            />
          </div>
        </div>

        <div className="py-4 items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlhtmlFor="username"
          >
            Gross Budget
          </label>
          <div className="relative w-96">
            <input
              type="text"
              className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="0"
              onChange={(ev) => setGrossBudget(ev.target.value)}
            />
            <span className="absolute right-0 top-0 w-10 bg-gray-500 text-white h-full flex items-center justify-center text-sm rounded-r-md">
              $
            </span>
          </div>
        </div>

        <div className="py-4 items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlhtmlFor="username"
          >
            Commissions
          </label>
          <div className="relative w-96">
            <input
              type="number"
              min={0.0}
              max={100.0}
              step={0.01}
              onChange={onCommissionsChange}
              className="block w-full bg-white border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="0"
            />
            <span className="absolute right-0 top-0 w-10 bg-gray-500 text-white h-full flex items-center justify-center text-sm rounded-r-md">
              %
            </span>
          </div>
        </div>
        <div className="py-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">Pacing</p>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id="horizontal-list-radio-license"
                  type="radio"
                  value=""
                  name="list-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="horizontal-list-radio-license"
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Fast{" "}
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id="horizontal-list-radio-id"
                  type="radio"
                  value=""
                  checked
                  name="list-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="horizontal-list-radio-id"
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Even
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id="horizontal-list-radio-millitary"
                  type="radio"
                  value=""
                  name="list-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="horizontal-list-radio-millitary"
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Slow
                </label>
              </div>
            </li>
          </ul>
        </div>
      </form>

      <div className="text-sm font-medium rounded-md  bg-gray-400/30 px-4 py-3 my-5 w-[786px]">
        {result ? `Result: $${result.toFixed(2)}` : "Result"}
        <br />
        {campaignDays && `Days: ${campaignDays}`}
      </div>
    </main>
  );
}
