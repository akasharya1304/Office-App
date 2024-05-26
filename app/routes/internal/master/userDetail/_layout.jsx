
import { Link, Outlet } from "@remix-run/react";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { requireUserSession } from "~/data/auth.server";
import { getUserDetail } from "~/data/master/userDetailMaster.server";


export default function MasterUserDetail() {
  return (
    <Outlet />
  );
}

export async function loader({request}){
  const userId = await requireUserSession(request);
  const data = getUserDetail(userId)
  return data;
}

export const handle = {
  breadcrumb: 'User Detail',
  routeClick: () => <Link to={INTERNALROUTES.MASTER_USER_DETAIL}>User Detail</Link>,
};
