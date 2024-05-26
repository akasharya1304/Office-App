import { redirect } from "@remix-run/node";
import ManageItemGoodMaster from "~/components/internal/Master/ItemsGoodsMasters/ManageItemGoodMaster";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { requireUserSession } from "~/data/auth.server";
import { addItemGood } from "~/data/master/itemsGoodsMaster.server";

export default function MasterItemsGoodsAdd() {
  return (
    <ManageItemGoodMaster />
  );
}

export async function action({request}){ 
  const userId = await requireUserSession(request)
  const formData = await request.formData()
  const itemsGoods = Object.fromEntries(formData)
  
  await addItemGood(itemsGoods, userId);
  return redirect(INTERNALROUTES.MASTER_ITEMS_GOODS_MASTERS);
}

export const handle = {
  breadcrumb: 'Add',
};