import { redirect } from "@remix-run/node";
import { useLoaderData, useMatches } from "@remix-run/react";
import EditBills from "~/components/internal/Bills/EditBillGenerate";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { requireUserSession } from "~/data/auth.server";
import { getAllMasterData, updateBillGenerationById } from "~/data/billGenerate.server";

export default function MasterStateEdit() {
  const matches = useMatches();
  const responseData = useLoaderData()
  // console.log("M",matches)
  const billDataById = matches.find(
    (d) => d.id === "routes/internal/bills/$billGenId/_billGenId"
  ).data;

  return (
    <EditBills 
      userDetail={responseData.userDetail}
      buyer={responseData.buyer}
      itemsGoods={responseData.itemsGoods}
      billDataById={billDataById}
    />
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const allMasters = await getAllMasterData(userId)
  return allMasters
}

export async function action({request, params}){
  const userId = await requireUserSession(request)
  const billGenId = params.billGenId;
  const formData = await request.formData()
  const data = Object.fromEntries(formData);
  const billGenerateData = JSON?.parse(data.editPayloadBillData);
  console.log(billGenerateData, billGenId)
  await updateBillGenerationById(billGenerateData, billGenId);
  return redirect(INTERNALROUTES.BILLS);
}

export const handle = {
  breadcrumb: 'Edit',
};