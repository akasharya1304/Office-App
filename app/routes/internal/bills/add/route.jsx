import { redirect, useLoaderData } from "@remix-run/react";
import ManageBills from "~/components/internal/Bills/ManageBillGenerate";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { requireUserSession } from "~/data/auth.server";
import { addBillGeneration, getAllMasterData } from "~/data/billGenerate.server";

export default function MasterStateAdd() {
  const responseData = useLoaderData()
  return (
    <ManageBills
      userDetail={responseData.userDetail}
      buyer={responseData.buyer}
      itemsGoods={responseData.itemsGoods}
    />
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  // console.log(userId)
  const allMasters = await getAllMasterData(userId)
  return allMasters
}


export async function action({request}){
  const userId = await requireUserSession(request)
  const formData = await request.formData()
  const data = Object.fromEntries(formData);
  const billGenerateData = JSON?.parse(data.billData);
  // console.log("add =", billGenerateData)
  await addBillGeneration(billGenerateData, userId);
  return redirect(INTERNALROUTES.BILLS);
}

export const handle = {
  breadcrumb: "Add",
};
