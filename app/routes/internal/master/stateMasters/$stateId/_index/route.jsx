import { useLoaderData } from "@remix-run/react";
import DisplayStateMaster from "~/components/internal/Master/StateMasters/DisplayStateMaster";
import { getStateById } from "~/data/master/stateMaster.server";

export default function MasterStateIDIndex() {
  const stateData = useLoaderData()

  return (
    <DisplayStateMaster stateData={stateData} />
  );
}

export async function loader({params}){
  const stateId = params.stateId;
  const stateData = getStateById(stateId)
  return stateData;
}