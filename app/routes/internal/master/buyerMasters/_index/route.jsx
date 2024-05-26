
import { Link, Outlet, json, useLoaderData } from "@remix-run/react";
import BuyerMasterIndex from "~/components/internal/Master/BuyerMasters";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { requireUserSession } from "~/data/auth.server";
import { getBuyer } from "~/data/master/buyerMaster.server";


export default function MasterBuyer() {
  const buyerList = useLoaderData()
  return (
    <>
    <BuyerMasterIndex buyerList={buyerList} />
    <Outlet />
    </>
  );
}

export async function loader({request}) {
  const userId = await requireUserSession(request)
  const buyerList = await getBuyer(userId)
  return buyerList
}
