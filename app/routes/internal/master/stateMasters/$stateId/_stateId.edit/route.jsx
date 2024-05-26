import { redirect } from "@remix-run/node";
import { useMatches } from "@remix-run/react";
import ManageStateMaster from "~/components/internal/Master/StateMasters/ManageStateMaster";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { requireUserSession } from "~/data/auth.server";
import { getStateUpdateById } from "~/data/master/stateMaster.server";

export default function MasterStateEdit() {
  const matches = useMatches();
  // console.log(matches)
  const stateData = matches.find(
    (d) => d.id === "routes/internal/master/stateMasters/$stateId/_stateId"
  ).data;

  return (
    <ManageStateMaster defaultStateData={stateData} />
  );
}

export async function action({request, params}){ 
  const userId = await requireUserSession(request)
  const stateId = params.stateId
  const formData = await request.formData()
  const stateData = Object.fromEntries(formData)
  
  await getStateUpdateById(stateData, stateId);
  return redirect(INTERNALROUTES.MASTER_STATE_MASTERS);
}

export const handle = {
  breadcrumb: 'Edit',
};