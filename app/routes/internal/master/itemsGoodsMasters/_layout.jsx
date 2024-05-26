import { Link, Outlet } from "@remix-run/react";
import INTERNALROUTES from "~/constant/InternalRoutes";

export default function ItemGoodMaster() {
  return (
   <Outlet />
  );
}

export const handle = {
  breadcrumb: 'Items Goods Master',
  routeClick: () => <Link to={`${INTERNALROUTES.MASTER_ITEMS_GOODS_MASTERS}`}>Items Goods Master</Link>,
};