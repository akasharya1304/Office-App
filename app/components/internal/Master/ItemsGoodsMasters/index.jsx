import MasterTable from "../MasterTable";
import { LinkButton } from "~/components/comman/Button";
import { IoMdAdd } from "react-icons/io";
import INTERNALROUTES from "~/constant/InternalRoutes";

function ItemsGoodsMasterIndex({ itemsGoods }) {
  const tableHeaders = [
    { head: "Item Name", key: "item_name", width: 180 },
    { head: "HSN / SAC", key: "hsn_sac", width: 210 },
    { head: "CGST", key: "cgst", width: 230 },
    { head: "SGST", key: "sgst", width: 230 },
    { head: "Last Edited", key: "modified_at", width: 80 },
  ];
  return (
    <>
      <div className="flex w-full justify-end items-center pr-2">
        <LinkButton
          path={`${INTERNALROUTES.MASTER_ITEMS_GOODS_MASTERS}/add`}
          icon={<IoMdAdd />}
          text={"ADD NEW"}
        />
      </div>
      <div className="w-full h-full mt-5 mb-10">
        <MasterTable
          tableHeaders={tableHeaders}
          tableData={itemsGoods}
          path={INTERNALROUTES.MASTER_ITEMS_GOODS_MASTERS}
        />
      </div>
    </>
  );
}

export default ItemsGoodsMasterIndex;
