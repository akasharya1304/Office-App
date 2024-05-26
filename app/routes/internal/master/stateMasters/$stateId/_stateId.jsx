import { Link, Outlet } from "@remix-run/react";
import INTERNALROUTES from "~/constant/InternalRoutes";
import {getStateById } from "~/data/master/stateMaster.server";

export default function StateMasterID() {
  return (
   <Outlet />
  );
}

export async function loader({params}){
  const stateId = params.stateId;
  const data = getStateById(stateId)
  return data;
}

export const handle = {
  breadcrumbIDText: (matchData) => {
    const stateIdData = matchData && matchData.data
    return (
      <Link to={`${INTERNALROUTES.MASTER_STATE_MASTERS}/${matchData?.params?.stateId}`}>
        {stateIdData?.state_name || ""}
      </Link>
    );
  },
  breadcrumb: 'State Master ID',
};
