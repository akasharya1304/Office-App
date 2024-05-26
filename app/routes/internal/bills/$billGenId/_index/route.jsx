import { json, useLoaderData } from "@remix-run/react";
import DisplayBill from "~/components/internal/Bills/DisplayBillGenerate";
import { requireUserSession } from "~/data/auth.server";
import { getBillGeneratedById } from "~/data/billGenerate.server";
import { getUserDetail } from "~/data/master/userDetailMaster.server";


export default function BillGenIdIndex() {
  const data = useLoaderData()
  // console.log(data)
  return (
    <DisplayBill billGenData={data.billGenData} userDetail={data.userDetail} />
  );
}

export async function loader({request, params}){
  const userId = await requireUserSession(request);
  const billGenId = params.billGenId;
  const billGenData = await getBillGeneratedById(billGenId)
  const userDetail = await getUserDetail(userId);
  return json({
    billGenData: billGenData,
    userDetail: userDetail
  })
}