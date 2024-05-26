import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { DateFormat } from "~/constant/method";

const TableBill = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const pdfData = useLoaderData();

  useEffect(() => {
    console.log(pdfUrl);
  }, [pdfUrl]);

  function base64PDFToBlobUrl(base64) {
    const binStr = atob && atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    const blob = new Blob([arr], { type: "application/pdf" });
    return blob;
  }

  const handlePDFPreview = (base64String) => {
    const extractedText = base64String.slice(base64String.indexOf(",") + 1);
    const blob = base64PDFToBlobUrl(extractedText);
    const url = URL.createObjectURL(blob);
    console.log(blob, url);
    setPdfUrl(url);
  };

  return (
    <div className="mt-10 mb-4">
      <div className="col-span-full">
        <label className="block my-4 text-2xl font-medium leading-6 text-gray-700 dark:text-gray-200">
          Bills
        </label>
      </div>
      <table className="table-auto w-full border-2 rounded-t-3xl dark:border-gray-500">
        <thead className="bg-neutral-100 dark:bg-slate-900">
          <tr className="border-b-2 dark:border-gray-500 text-gray-400 dark:text-gray-200">
            <th className="tracking-wider font-semibold text-start p-3">
              S No.
            </th>
            <th className="tracking-wider font-semibold text-start p-3">
              NAME
            </th>
            <th className="tracking-wider font-semibold text-start p-3">
              SIZE
            </th>
            <th className="tracking-wider font-semibold text-start p-3">
              DATE
            </th>
            <th className="tracking-wider font-semibold text-start p-3">
              Preview
            </th>
          </tr>
        </thead>
        <tbody>
          {pdfData &&
            pdfData.length > 0 &&
            pdfData.map((d, i) => (
              <tr
                key={d.id}
                className="border-y-2 dark:border-gray-500 dark:text-slate-400"
              >
                <td className="text-start text-sm p-3">{i + 1}</td>
                <td className="text-start text-sm p-3">{d.fileName}</td>
                <td className="text-start text-sm p-3">{d.fileSize} KB</td>
                <td className="text-start text-sm p-3">{DateFormat(d.createdAt)}</td>
                <td
                  className="text-center text-sm p-3"
                  onClick={() => handlePDFPreview(d.base64)}
                >
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-5 min-h-5"
                  >
                    <MdOutlineDocumentScanner className="scale-150" />
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBill;
