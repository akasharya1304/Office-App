import { Outlet, useLoaderData } from "@remix-run/react";
import BillsIndex from "~/components/internal/Bills";
import { requireUserSession } from "~/data/auth.server";
import { getAllBillGenerated } from "~/data/billGenerate.server";
import { getBuyerById } from "~/data/master/buyerMaster.server";

export default function MasterState() {
  const billData = useLoaderData();
  return (
    <>
      <BillsIndex billData={billData} />
      <Outlet />
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const billData = await getAllBillGenerated(userId);
  for (let index = 0; index < billData.length; index++) {
    let BuyerID = billData[index]["buyer"]
    billData[index]["buyer"] = await getBuyerById(BuyerID)

    delete billData[index]["userId"];
    delete billData[index]["buyer"]["userId"];
  }
  console.log(billData);
  return billData;
}
