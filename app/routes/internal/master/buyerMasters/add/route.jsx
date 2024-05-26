import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ManageBuyerMaster from "~/components/internal/Master/BuyerMasters/ManageBuyerMaster";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { requireUserSession } from "~/data/auth.server";
import { addBuyer } from "~/data/master/buyerMaster.server";
import { getActiveState } from "~/data/master/stateMaster.server";

export default function MasterItemsGoodsAdd() {
  const stateList = useLoaderData();
  return <ManageBuyerMaster stateList={stateList} />;
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const stateList = await getActiveState(userId);
  return stateList;
}

export async function action({ request }) {
  const userId = await requireUserSession(request);
  const formData = await request.formData();
  const buyer = Object.fromEntries(formData);

  await addBuyer(buyer, userId);
  return redirect(INTERNALROUTES.MASTER_BUYER_MASTERS);
}

export const handle = {
  breadcrumb: "Add",
};
