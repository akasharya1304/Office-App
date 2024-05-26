import { redirect } from "@remix-run/node";
import ManageStateMaster from "~/components/internal/Master/StateMasters/ManageStateMaster";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { requireUserSession } from "~/data/auth.server";
import { addState } from "~/data/master/stateMaster.server";

export default function MasterStateAdd() {
  return (
    <ManageStateMaster />
  );
}

export async function action({request}){ 
  const userId = await requireUserSession(request)
  const formData = await request.formData()
  const stateData = Object.fromEntries(formData)
  
  await addState(stateData, userId);
  return redirect(INTERNALROUTES.MASTER_STATE_MASTERS);
}

export const handle = {
  breadcrumb: 'Add',
};