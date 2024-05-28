import { BillPDF } from "~/components/internal/Bills/BillPDF";
import { requireUserSession } from "~/data/auth.server";
import { getBillGeneratedById } from "~/data/billGenerate.server";
import { getUserDetail } from "~/data/master/userDetailMaster.server";

export async function loader({request, params}) {
  const userId = await requireUserSession(request);
  const billGenId = params.billGenId;
  const billGenData = await getBillGeneratedById(billGenId)
  const userDetail = await getUserDetail(userId);

  const base64 = await BillPDF(billGenData, userDetail);

  const pdfBuffer = Buffer.from(base64, 'base64');

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      'Content-Length': pdfBuffer.length.toString()
    },
  });
}