import { Link, Outlet } from "@remix-run/react";
import INTERNALROUTES from "~/constant/InternalRoutes";

export default function BuyerMaster() {
  return (
   <Outlet />
  );
}


export const handle = {
  breadcrumb: 'Buyer Masters',
  routeClick: () => <Link to={`${INTERNALROUTES.MASTER_BUYER_MASTERS}`}>Buyer Masters</Link>,
};