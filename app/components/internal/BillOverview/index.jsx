import PageHeading from "~/components/comman/PageHeading";
import TableBill from "./TableBill";
import UploadPdf from "./UploadPdf";

function BillOverviewIndex() {
  return (
    <div className="w-full h-full">
      <PageHeading heading='Bill Overview' />
      <UploadPdf />
      <TableBill />
    </div>
  );
}

export default BillOverviewIndex;
