import { Link, Outlet } from "@remix-run/react";
import PageHeading from "~/components/comman/PageHeading";
import INTERNALROUTES from "~/constant/InternalRoutes";

export default function Master() {
  return (
    <div className="w-full h-full">
      <PageHeading heading="Master Management" />
      <Outlet />
      </div>
  );
}

export const handle = {
  breadcrumb: 'Master Management',
  routeClick: () => <Link to={INTERNALROUTES.MASTER}>Master Management</Link>,
};