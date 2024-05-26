import { redirect } from "@remix-run/node";
import { useLoaderData, useMatches } from "@remix-run/react";
import ManageBuyerMaster from "~/components/internal/Master/BuyerMasters/ManageBuyerMaster";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { requireUserSession } from "~/data/auth.server";
import { getBuyerUpdateById } from "~/data/master/buyerMaster.server";
import { getActiveState } from "~/data/master/stateMaster.server";

export default function MasterBuyerEdit() {
  const stateList = useLoaderData();
  const matches = useMatches();
  // console.log(matches)
  const buyerData = matches.find(
    (d) => d.id === "routes/internal/master/buyerMasters/$buyerId/_buyerId"
  ).data;

  return (
    <ManageBuyerMaster defaultBuyerData={buyerData} stateList={stateList} />
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const stateList = await getActiveState(userId);
  return stateList;
}

export async function action({request, params}){ 
  const userId = await requireUserSession(request)
  const buyerId = params.buyerId
  const formData = await request.formData()
  const buyerData = Object.fromEntries(formData)
  
  await getBuyerUpdateById(buyerData, buyerId);
  return redirect(INTERNALROUTES.MASTER_BUYER_MASTERS);
}

export const handle = {
  breadcrumb: 'Edit',
};