import { Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import InternalPageLayout from "~/Layout/InternalPageLayout";
import { LoadCookiesData, StoreCookiesData } from "~/components/utils/CookiesStateData";
import { requireUserSession } from "~/data/auth.server";

export default function Index() {
  const fetcher = useFetcher();
  let { cookieData } = useLoaderData();

  if (fetcher.formData?.has("UITheme")) {
    cookieData.UITheme = fetcher.formData.get("UITheme");
  }
  return (
    <div className="w-full flex flex-col xs:flex-row">
      <InternalPageLayout />
      <div
        id="scroll"
        className={`w-full h-screen flex overflow-y-auto pt-8 pr-4 pb-0 pl-8
         bg-whiteColor dark:bg-darkModeColor 
         ${cookieData.UITheme === "dark" ? "dark" : "light"} `}
      >
        <Outlet />
      </div>
    </div>
  );
}

export async function loader({request}) {
  const userId = await requireUserSession(request)
  const cookieData = await LoadCookiesData(request,  ['UITheme'])
  return {userId, cookieData};
}

export async function action({ request }) {
  const cookieData = await StoreCookiesData(request, ['UITheme'])
  return cookieData;
}
