import { redirect, useLoaderData, useMatches } from "@remix-run/react";
import ManageUserDetailMaster from "~/components/internal/Master/UserDetail/ManageUserDetailMaster";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { requireUserSession } from "~/data/auth.server";
import { getActiveState } from "~/data/master/stateMaster.server";
import { addUserDetail, getUserDetail, getUserDetailUpdateById } from "~/data/master/userDetailMaster.server";



export default function MasterUserDetail() {
  const stateList = useLoaderData();
  const matches = useMatches();
  const userDetailData = matches.find(
    (d) => d.id === "routes/internal/master/userDetail/_layout"
  ).data;

  return (
    <ManageUserDetailMaster defaultUserDetailData={userDetailData} stateList={stateList} />
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const stateList = await getActiveState(userId);
  return stateList;
}

export async function action({request}){ 
  const userId = await requireUserSession(request)
  const formData = await request.formData()
  const userDetailData = Object.fromEntries(formData)
  const initialData = await getUserDetail(userId)
  // console.log(initialData)
  if(initialData === undefined || initialData?.length === 0){
    await addUserDetail(userDetailData, userId);
  }else{
    await getUserDetailUpdateById(userDetailData, initialData.id);
  }
  
  
  return redirect(INTERNALROUTES.MASTER_USER_DETAIL);
}


export const handle = {
  breadcrumb: 'EDIT',
};
