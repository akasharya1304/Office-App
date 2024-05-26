import { Link, Outlet } from "@remix-run/react";
import PageHeading from "~/components/comman/PageHeading";
import INTERNALROUTES from "~/constant/InternalRoutes";

export default function Master() {
  return (
    <div className="w-full h-full">
      <PageHeading heading="Bills" />
      <Outlet />
      </div>
  );
}

export const handle = {
  breadcrumb: 'Bills',
  routeClick: () => <Link to={INTERNALROUTES.BILLS}>Bills</Link>,
};