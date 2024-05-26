import { Link, Outlet } from "@remix-run/react";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { getBuyerById } from "~/data/master/buyerMaster.server";

export default function StateMasterID() {
  return (
   <Outlet />
  );
}

export async function loader({params}){
  const buyerId = params.buyerId;
  const data = getBuyerById(buyerId)
  return data;
}

export const handle = {
  breadcrumbIDText: (matchData) => {
    const buyerIdData = matchData && matchData.data
    return (
      <Link to={`${INTERNALROUTES.MASTER_BUYER_MASTERS}/${matchData?.params?.buyerId}`}>
        {buyerIdData?.buyer_name || ""}
      </Link>
    );
  },
  breadcrumb: 'Buyer Master ID',
};
