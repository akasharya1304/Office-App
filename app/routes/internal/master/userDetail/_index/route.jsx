
import { useLoaderData } from "@remix-run/react";
import DisplayUserDetailMaster from "~/components/internal/Master/UserDetail/DisplayUserDetailMaster";
import { requireUserSession } from "~/data/auth.server";
import { getUserDetail } from "~/data/master/userDetailMaster.server";


export default function MasterUserDetail() {
  const userDetailData = useLoaderData()
  return (
    <DisplayUserDetailMaster userDetailData={userDetailData} />
  );
}

export async function loader({request}){
  const userId = await requireUserSession(request);
  const data = getUserDetail(userId)
  return data;
}
