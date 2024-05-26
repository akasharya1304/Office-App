import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import DrawerContent from "./DrawerContent";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { HiOutlineLogout } from "react-icons/hi";

function InternalPageLayout(props) {
  const [isOpen, setIsOpen] = useState(true);
  const fetcher = useFetcher();
  let { cookieData } = useLoaderData();

  // use optimistic UI to immediately change the UI state
  if (fetcher.formData?.has("UITheme")) {
    cookieData.UITheme = fetcher.formData.get("UITheme");
  }

  const handleMenuButtonClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`flex xs:hidden flex-col w-full h-full "} `}>
        <div
          className={` ${
            isOpen
              ? "flex flex-col z-50 absolute h-full bg-gradient-to-t from-drawerStart to-drawerEnd bg-no-repeat"
              : "bg-whiteColor dark:bg-darkModeColor h-fit"
          }  
        " `}
        >
          <button
            size="large"
            aria-label="menu"
            variant="text"
            tabIndex={-1}
            className={`flex basis-1/12 ${
              isOpen
                ? "xs:hidden justify-start text-white"
                : "flex text-darkColor bg-white"
            } mt-7 ml-6 h-fit bg-inherit border-0`}
            onClick={handleMenuButtonClick}
          >
            <GiHamburgerMenu className="scale-150" />
          </button>
          <div
            className={`${
              !isOpen
                ? "hidden"
                : "flex flex-col justify-between items-center basis-11/12"
            } `}
          >
            <DrawerContent {...props} open={isOpen} />
            <div className="flex flex-col justify-center border-t-2 border-solid border-white">
              <Form method="post" action="/logout" id="logout-form">
                <button
                  className={`flex items-center min-h-5 p-3 rounded-3xl 
                text-white hover:bg-orangeHoverHighted
                    ${isOpen ? "min-w-36 px-1.5" : "min-w-5"}  
                    `}
                >
                  <span
                    className="flex items-center min-w-5 min-h-5 p-1 
                    rounded-3xl text-white hover:bg-orangeHoverHighted scale-150 
                    "
                  >
                    <HiOutlineLogout />
                  </span>
                  <span
                    className={`${
                      isOpen ? "pl-4" : "hidden"
                    } text-sm text-white font-semibold`}
                  >
                    Logout
                  </span>
                </button>
              </Form>
              <div className="p-3">
                <fetcher.Form method="post">
                  <button
                    name="UITheme"
                    value={cookieData.UITheme === "dark" ? "light" : "dark"}
                    className={`${isOpen ? "min-w-36" : "min-w-5"} `}
                  >
                    <label className="inline-flex items-center cursor-pointer w-full">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        defaultChecked={cookieData.UITheme === "dark"}
                      />
                      <div
                        className="relative w-9 h-5 bg-white rounded-full 
                        peer peer-focus:ring-4 peer-focus:ring-red-300
                        dark:peer-focus:ring-white dark:bg-gray-700 
                        peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                        peer-checked:after:border-gray-600 after:content-[''] 
                        after:absolute after:top-0.5 after:start-[2px] after:bg-gray-500 after:border-gray-600 
                        after:border after:rounded-full after:h-4 after:w-4 after:transition-all 
                        dark:border-gray-600 peer-checked:bg-gray-700"
                      ></div>
                      <span className={`${!isOpen && 'hidden'} ms-3 text-sm text-white font-semibold `}>
                        {cookieData.UITheme === "dark" ? "Dark" : "Light"}
                      </span>
                    </label>
                  </button>
                </fetcher.Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden xs:flex xs:w-full xs:h-screen">
        <div className="flex flex-col h-full bg-gradient-to-t from-drawerStart to-drawerEnd bg-no-repeat">
          <button
            size="large"
            aria-label="menu"
            variant="text"
            tabIndex={-1}
            className={`flex basis-1/12 ${
              isOpen ? "justify-start pl-6" : "justify-center"
            } items-center
          w-full h-14 mt-2.5 text-whiteColor bg-inherit border-0`}
            onClick={handleMenuButtonClick}
          >
            <GiHamburgerMenu className="scale-150" />
          </button>
          <div
            className={`flex flex-col justify-between items-center basis-11/12 `}
          >
            <DrawerContent {...props} open={isOpen} />
            <div className="flex flex-col justify-center items-center border-t-2 border-solid border-white">
              <Form method="post" action="/logout" id="logout-form">
                <button
                  className={`flex items-center min-h-5 p-3 rounded-3xl 
                text-white hover:bg-orangeHoverHighted
                    ${isOpen ? "min-w-36 px-1.5" : "min-w-5"} `}
                >
                  <span
                    className="flex items-center min-w-5 min-h-5 p-1 
                    rounded-3xl text-white hover:bg-orangeHoverHighted scale-150  
                    "
                  >
                    <HiOutlineLogout />
                  </span>
                  <span
                    className={`${
                      isOpen ? "pl-4" : "hidden"
                    } text-sm text-white font-semibold`}
                  >
                    Logout
                  </span>
                </button>
              </Form>
              <div className="p-3">
              <fetcher.Form method="post">
                  <button
                    name="UITheme"
                    value={cookieData.UITheme === "dark" ? "light" : "dark"}
                    className={`${isOpen ? "min-w-36" : "min-w-5"} `}
                  >
                    <label className="inline-flex items-center cursor-pointer w-full">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        defaultChecked={cookieData.UITheme === "dark"}
                      />
                      <div
                        className="relative w-9 h-5 bg-white rounded-full 
                        peer peer-focus:ring-4 peer-focus:ring-red-300
                        dark:peer-focus:ring-white dark:bg-gray-700 
                        peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                        peer-checked:after:border-gray-600 after:content-[''] 
                        after:absolute after:top-0.5 after:start-[2px] after:bg-gray-500 after:border-gray-600 
                        after:border after:rounded-full after:h-4 after:w-4 after:transition-all 
                        dark:border-gray-600 peer-checked:bg-gray-700"
                      ></div>
                      <span className={`${!isOpen && 'hidden'} ms-3 text-sm text-white font-semibold `}>
                        {cookieData.UITheme === "dark" ? "Dark" : "Light"}
                      </span>
                    </label>
                  </button>
                </fetcher.Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternalPageLayout;
