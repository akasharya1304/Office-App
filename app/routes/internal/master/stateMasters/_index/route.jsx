import { Outlet, useLoaderData } from "@remix-run/react";
import StateMasterIndex from "~/components/internal/Master/StateMasters";
import { requireUserSession } from "~/data/auth.server";
import { getState } from "~/data/master/stateMaster.server";

export default function MasterState() {
  const stateData = useLoaderData()
  return (
    <>
      <StateMasterIndex stateData={stateData} />
      <Outlet />
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const stateData = await getState(userId);
  return stateData;
}
