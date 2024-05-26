import MasterTable from "../MasterTable";
import { LinkButton } from "~/components/comman/Button";
import { IoMdAdd } from "react-icons/io";
import INTERNALROUTES from "~/constant/InternalRoutes";

function StateMasterIndex({ stateData }) {
  const tableHeaders = [
    { head: "State Name", key: "state_name", width: 180 },
    { head: "State Code", key: "state_code", width: 210 },
    { head: "Last Edited", key: "modified_at", width: 80 },
  ];
  return (
    <>
      <div className="flex w-full justify-end items-center pr-2">
        <LinkButton
          path={`${INTERNALROUTES.MASTER_STATE_MASTERS}/add`}
          icon={<IoMdAdd />}
          text={"ADD NEW"}
        />
      </div>
      <div className="w-full h-full mt-5 mb-10">
        <MasterTable
          tableHeaders={tableHeaders}
          tableData={stateData}
          path={INTERNALROUTES.MASTER_STATE_MASTERS}
        />
      </div>
    </>
  );
}

export default StateMasterIndex;
