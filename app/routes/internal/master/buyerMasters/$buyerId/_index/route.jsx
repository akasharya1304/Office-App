import { useLoaderData } from "@remix-run/react";
import DisplayBuyerMaster from "~/components/internal/Master/BuyerMasters/DisplayBuyerMaster";
import { getBuyerById } from "~/data/master/buyerMaster.server";

export default function MasterStateIDIndex() {
  const buyerData = useLoaderData()
  return (
    <DisplayBuyerMaster buyerData={buyerData} />
  );
}

export async function loader({params}){
  const buyerId = params.buyerId;
  const buyerData = getBuyerById(buyerId)
  return buyerData;
}