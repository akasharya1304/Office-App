import { useLoaderData } from "@remix-run/react";
import DisplayItemGoodMaster from "~/components/internal/Master/ItemsGoodsMasters/DisplayItemGoodMaster";
import { getItemGoodById } from "~/data/master/itemsGoodsMaster.server";

export default function MasterStateIDIndex() {
  const itemsGoods = useLoaderData()

  return (
    <DisplayItemGoodMaster itemsGoods={itemsGoods} />
  );
}

export async function loader({params}){
  const ItemGoodId = params.ItemGoodId;
  const itemsGoods = getItemGoodById(ItemGoodId)
  return itemsGoods;
}