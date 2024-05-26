import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { LuLayers } from "react-icons/lu";
import { NavLink,} from "@remix-run/react";
import Logo from "~/images/Logo.jpg";
import INTERNALROUTES from "~/constant/InternalRoutes";

const DrawerContent = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  // console.log("M =>", selectedIndex)
  const { open } = props;

  
  const handlePageTitle = (title, index) => setSelectedIndex(index);

  const listItems = [
    {
      path: INTERNALROUTES.BILLS,
      title: "Bills",
      index: 0,
      icon: <IoHomeOutline />,
    },
    {
      path: INTERNALROUTES.BILL_OVERVIEW,
      title: "Bill Overview",
      index: 1,
      icon: <LiaFileInvoiceSolid />,
    },
    {
      path: INTERNALROUTES.MASTER,
      title: "Master",
      index: 2,
      icon: <LuLayers />,
    },
  ];

  return (
    <div className="flex flex-col place-items-center">
      <div className="flex justify-center cursor-pointer">
        <img
          src={`${Logo}`}
          className={`${
            open ? "h-24 mb-5" : "h-8 mb-2"
          } w-4/5 rounded-lg object-contain bg-inherit`}
          alt="Logo"
          height={"100%"}
          width={"100%"}
        />
      </div>
      <li className="flex flex-col justify-center p-0 text-white overflow-y-auto">
        {listItems.map((list, index) => {
          return (
            <NavLink
              to={list.path}
              className={({ isActive, isPending }) =>
                `${isPending 
                ? "bg-inherit hover:bg-orangeHoverHighted"
                : (isActive || selectedIndex === index)  && "bg-orangeHighted" } 
                "no-underline my-1 mx-0 flex items-center min-h-5 p-1 rounded-3xl text-white"
                ${open ? "min-w-36" : "min-w-5"}`
              }
              key={`ListItemContainer-${index}`}
              end
            >
              <div className="flex justify-center">
              {/* <fetcher.Form method="post"> */}
                <button
                  onClick={(e) => {
                    handlePageTitle(list.title, index);
                  }}
                  value={index}
                  className={`flex items-center min-h-5 p-1 rounded-3xl text-white`}
                >
                  <span
                    className={`flex items-center min-w-5 min-h-5 p-1 rounded-3xl scale-150 text-white`}
                  >
                    {list.icon}
                  </span>
                  <span
                    className={`${
                      open ? "pl-4 pt-1" : "hidden"
                    } text-sm font-semibold text-white`}
                  >
                    {list.title}
                  </span>
                </button>
                {/* </fetcher.Form> */}
              </div>
            </NavLink>
          );
        })}
      </li>
    </div>
  );
};

export default DrawerContent;
