import { Link } from "@remix-run/react";

function MasterCard({path, title, icon, descrption }) {
  return (
    <Link to={path}>
    <div className="w-fit h-fit">
      <div className="flex">
        <div className="h-24 w-80 border-2 dark:border-gray-500 rounded-xl shadow-lg">
          <div className="flex items-center h-full w-full">
            <div className="flex justify-center items-center w-1/4 h-full">
              <span className="scale-150 text-amber-600">{icon}</span>
            </div>
            <div className="flex flex-col w-3/4 h-full items-center ">
              <div className="flex font-semibold w-full h-1/2 items-end dark:text-slate-200">
                {title}
              </div>
              <div className="flex w-full h-1/2 items-start tex-xs font-normal dark:text-slate-400">
                {descrption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default MasterCard;
