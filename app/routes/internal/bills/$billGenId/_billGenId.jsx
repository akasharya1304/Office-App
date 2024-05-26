import { Link, Outlet } from "@remix-run/react";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { getBillGeneratedById } from "~/data/billGenerate.server";
// import {getStateById } from "~/data/master/stateMaster.server";

export default function BillGenId() {
  return (
   <Outlet />
  );
}

export async function loader({params}){
  const billGenId = params.billGenId;
  const data = getBillGeneratedById(billGenId)
  return data;
}

export const handle = {
  breadcrumbIDText: (matchData) => {
    const billGenIdData = matchData && matchData.data
    return (
      <Link to={`${INTERNALROUTES.BILLS}/${matchData?.params?.billGenId}`}>
        {billGenIdData?.invoice_no || ""}
      </Link>
    );
  },
  breadcrumb: 'Bill ID',
};
