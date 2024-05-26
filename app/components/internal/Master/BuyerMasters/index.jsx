import MasterTable from "../MasterTable";
import { LinkButton } from "~/components/comman/Button";
import { IoMdAdd } from "react-icons/io";
import INTERNALROUTES from "~/constant/InternalRoutes";

function BuyerMasterIndex({ buyerList }) {
  const tableHeaders = [
    { head: "Buyer Name", key: "buyer_name", width: 180 },
    { head: "GSTIN / UIN", key: "gstin_uin", width: 210 },
    { head: "Address", key: "address", width: 230 },
    { head: "Last Edited", key: "modified_at", width: 80 },
  ];
  return (
    <>
      <div className="flex w-full justify-end items-center pr-2">
        <LinkButton
          path={`${INTERNALROUTES.MASTER_BUYER_MASTERS}/add`}
          icon={<IoMdAdd />}
          text={"ADD NEW"}
        />
      </div>
      <div className="w-full h-full mt-5 mb-10">
        <MasterTable
          tableHeaders={tableHeaders}
          tableData={buyerList}
          path={INTERNALROUTES.MASTER_BUYER_MASTERS}
        />
      </div>
    </>
  );
}

export default BuyerMasterIndex;
