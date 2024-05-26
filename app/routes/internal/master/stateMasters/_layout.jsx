import { Link, Outlet } from "@remix-run/react";
import INTERNALROUTES from "~/constant/InternalRoutes";

export default function StateMaster() {
  return (
   <Outlet />
  );
}

export const handle = {
  breadcrumb: 'State Master',
  routeClick: () => <Link to={`${INTERNALROUTES.MASTER_STATE_MASTERS}`}>State Master</Link>,
};