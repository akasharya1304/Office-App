import { redirect } from "@remix-run/node";
import { useMatches } from "@remix-run/react";
import ManageItemGoodMaster from "~/components/internal/Master/ItemsGoodsMasters/ManageItemGoodMaster";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { requireUserSession } from "~/data/auth.server";
import { getItemGoodUpdateById } from "~/data/master/itemsGoodsMaster.server";

export default function MasterItemGoodEdit() {
  const matches = useMatches();
  // console.log(matches)
  const itemsGoodsData = matches.find(
    (d) => d.id === "routes/internal/master/itemsGoodsMasters/$ItemGoodId/_ItemGoodId"
  ).data;

  return (
    <ManageItemGoodMaster defaultItemGoodData={itemsGoodsData} />
  );
}

export async function action({request, params}){ 
  const userId = await requireUserSession(request)
  const ItemGoodId = params.ItemGoodId
  const formData = await request.formData()
  const itemsGoodsData = Object.fromEntries(formData)
  
  await getItemGoodUpdateById(itemsGoodsData, ItemGoodId);
  return redirect(INTERNALROUTES.MASTER_ITEMS_GOODS_MASTERS);
}

export const handle = {
  breadcrumb: 'Edit',
};