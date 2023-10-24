import { Tooltip } from "react-tooltip";

const Button = (props) => {
  let ClassName =
    "flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";

  if (props.view == "plain") {
    ClassName = "";
  }

  if (props.view == "large") {
    ClassName =
      "text-white flex items-center gap-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2";
  }

  ClassName = props.className ? props.className + " " + ClassName : ClassName;

  const randomID = "button-" + Math.floor(Math.random() * 1000000000);

  return (
    <div className="inline-block relative">
      <button {...props} type="button" id={`${randomID}`} className={ClassName}>
        {props.children}
      </button>
      {props.title && (
        <Tooltip anchorSelect={`#${randomID}`} place="top">
          {props.title}
        </Tooltip>
      )}
    </div>
  );
};

export default Button;
