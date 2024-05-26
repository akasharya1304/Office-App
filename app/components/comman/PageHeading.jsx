import { useMatches } from "@remix-run/react";
import { IoIosArrowForward } from "react-icons/io";

function PageHeading({ heading }) {
  const matches = useMatches();
  const breadcrumbLinks = matches.filter(
    (match) => match.handle && match.handle.breadcrumb
  );
  // console.log(matches, breadcrumbLinks);
  return (
    <h4 className="text-2xl font-bold tracking-tight text-LightModeTextColor dark:text-whiteColor">
        <div className="w-full flex-wrap flex items-center">
          {breadcrumbLinks.map((match, index) =>
            index === breadcrumbLinks.length - 1 ? (
              <span key={index} className="text-gray-400 dark:text-gray-300">
              {/* {console.log("dsfds1", match)} */}
                {match.handle.breadcrumbIDText
                  ? match.handle.breadcrumbIDText(match)
                  : match.handle.breadcrumb}
              </span>
            ) : (
              <span key={index} className="flex items-center">
                <span className="text-amber-600">
                {/* {console.log("dsfds2", match)} */}
                  {match.handle.breadcrumbIDText
                  ? match.handle.breadcrumbIDText(match)
                  : match.handle.routeClick(match)}
                </span>
                <span className="scale-100">
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </span>
            )
          )}
        </div>
    </h4>
  );
}

export default PageHeading;
