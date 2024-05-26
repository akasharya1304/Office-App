import { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineInfo } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { redirect, useMatches } from "@remix-run/react";

const SnackbarComponent = ({ open, message, type }) => {
  const matches = useMatches()
  const [openSnackbar, setOpenSnackbar] = useState(open || false);
  let bgColor = "";
  let icon = "";

  useEffect(() => {
    console.log("openSnackbar", openSnackbar, matches[matches.length - 1].pathname, matches);
    redirect(matches[matches.length - 1].pathname)
  }, [openSnackbar]);

  if (Boolean(openSnackbar)) {
    setTimeout(() => {
      setOpenSnackbar(false);
    }, 4000);
  }

  switch (type) {
    case "success":
      bgColor = "bg-green-700";
      icon = <IoMdCheckmarkCircleOutline />;
      break;
    case "info":
      bgColor = "bg-sky-600";
      icon = <MdOutlineInfo />;
      break;
    case "warning":
      bgColor = "bg-amber-600";
      icon = <IoWarningOutline />;
      break;
    case "error":
      bgColor = "bg-red-700";
      icon = <MdErrorOutline />;
      break;
    default:
      break;
  }

  return (
    <div
      className={` absolute bottom-10 inset-x-[45%] z-[1000] `}
    >
      <div
        role="alert"
        className={`relative ${
        openSnackbar ? "flex" : "none"
      } items-center min-w-72 max-w-96 px-4 py-3 text-base text-white ${bgColor} rounded-lg font-regular `}
      >
        <div className="shrink-0 scale-125">{icon}</div>
        <div className="ml-4 mr-2">{message || "Something went wrong"}</div>
      </div>
    </div>
  );
};

export { SnackbarComponent };
