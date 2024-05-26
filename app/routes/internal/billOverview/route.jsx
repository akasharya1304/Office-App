import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import BillOverviewIndex from "~/components/internal/BillOverview";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { requireUserSession } from "~/data/auth.server";
import { addBill, getBill } from "~/data/bill.server";
// import { requireUserSession } from "~/data/auth.server";

export default function BillOverview() {
  return (
    <>
      <BillOverviewIndex />
      <Outlet />
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const pdfData = await getBill(userId);
  // const expenses = await getExpenses(userId)
  // console.log("r", request)
  return pdfData;
}

export async function action({ request }) {
  const userId = await requireUserSession(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const pdfListData = JSON?.parse(data.pdfData);

  // for (const object of pdfListData) {
  // console.log(object.fileName);
  await addBill(pdfListData, userId);
  // }
  // console.log("checking13",)
  return redirect(INTERNALROUTES.BILL_OVERVIEW);
}

export const handle = {
  breadcrumb: "Bill Overview",
  routeClick: () => (
    <Link to={INTERNALROUTES.BILL_OVERVIEW}>Bill Overview</Link>
  ),
};