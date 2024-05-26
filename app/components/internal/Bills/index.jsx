import { LinkButton } from "~/components/comman/Button";
import { IoMdAdd } from "react-icons/io";
import INTERNALROUTES from "~/constant/InternalRoutes";
import Table from "./Table";
import { SnackbarComponent } from "~/components/utils/SnackbarComponent";

function BillsIndex({billData}) {
    const tableHeaders = [
      { head: "Invoice", key: "invoice_no", key2: "invoice_date", width: 80 },
      { head: "Buyer", key: "buyer.buyer_name", width: 180 },
      { head: "Buyer Order", key: "buyer_order_no", key2: "buyer_order_date", width: 180 },
      { head: "Total Amount", key: "total_amount", width: 210 },
      { head: "Last Edited", key: "modified_at", width: 80 },
    ];
    return (
      <>
        <div className="flex w-full justify-end items-center pr-2">
          <LinkButton
            path={`${INTERNALROUTES.BILLS}/add`}
            icon={<IoMdAdd />}
            text={"ADD NEW"}
          />
        </div>
        <div className="w-full h-full mt-5 mb-10">
          <Table
            tableHeaders={tableHeaders}
            tableData={billData}
            path={INTERNALROUTES.BILLS}
          />
        </div>
      </>
    );
  }

export default BillsIndex;