import { Link, Outlet } from "@remix-run/react";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { getItemGoodById } from "~/data/master/itemsGoodsMaster.server";

export default function StateMasterID() {
  return (
   <Outlet />
  );
}

export async function loader({params}){
  const ItemGoodId = params.ItemGoodId;
  const data = getItemGoodById(ItemGoodId)
  return data;
}

export const handle = {
  breadcrumbIDText: (matchData) => {
    const itemGoodIdData = matchData && matchData.data
    return (
      <Link to={`${INTERNALROUTES.MASTER_ITEMS_GOODS_MASTERS}/${matchData?.params?.ItemGoodId}`}>
        {itemGoodIdData?.item_name || ""}
      </Link>
    );
  },
  breadcrumb: 'Items Goods Master ID',
};
