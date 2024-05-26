import { Outlet, useLoaderData } from "@remix-run/react";
import ItemsGoodsMasterIndex from "~/components/internal/Master/ItemsGoodsMasters";
import { requireUserSession } from "~/data/auth.server";
import { getItemGood } from "~/data/master/itemsGoodsMaster.server";

export default function MasterItemsGoods() {
  const itemsGoods = useLoaderData()
  return (
    <>
    <ItemsGoodsMasterIndex itemsGoods={itemsGoods} />
    <Outlet />
    </>
  );
}

export async function loader({request}) {
  const userId = await requireUserSession(request)
  const itemGoodList = await getItemGood(userId)
  return itemGoodList

}
