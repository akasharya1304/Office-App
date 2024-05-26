import { Form, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import INTERNALROUTES from "~/constant/InternalRoutes";

const UploadPdf = () => {
  // const [pdfList, setPdfList] = useState([]);
  const [previewPdfList, setPreviewPdfList] = useState([]);
  const submit = useSubmit();

  useEffect(() => {
    console.log(previewPdfList);
  }, [previewPdfList]);

  const handleStorePdf = (event) => {
    let files = event.target.files;
    if (files.length) {
      // setPdfList(files);
      for (var i = 0; i < files.length; i++) {
        // console.log(files[i]);
        const fileName = files[i].name;
        const fileSize = Number(files[i].size / 1024).toFixed(2);
        const reader = new FileReader();
        reader.readAsDataURL(files[i]); // Read PDF as base64

        reader.onload = (event) => {
          setPreviewPdfList((prevPreviews) => [
            ...prevPreviews,
            {
              base64: event.target.result,
              fileName: fileName,
              fileSize: fileSize,
            },
          ]);
        };
      }
    } else {
      setPreviewPdfList([]);
    }
  };

  const handleSubmit = async () => {
    const pdfData = JSON.stringify(previewPdfList[0]);
    setPreviewPdfList([]);
    submit(
      { pdfData: pdfData },
      { action: INTERNALROUTES.BILL_OVERVIEW, method: "post" }
    );
  };

  return (
    <div className="space-y-4">
      <div className="border-b-2 border-gray-900/10 dark:border-gray-200/100 pb-4">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="upload-pdf"
              className="block text-2xl font-medium leading-6 text-gray-700 dark:text-gray-200"
            >
              Upload Pdf
            </label>
            <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-900/25 dark:bg-slate-600 px-6 py-10">
              <div className="text-center">
                <FaRegFilePdf
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer dark:bg-slate-600 dark:text-indigo-400 rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span className="font-bold ">Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      accept=".pdf"
                      onChange={(e) => {
                        e.preventDefault();
                        handleStorePdf(e);
                      }}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1 dark:text-gray-300">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-700 dark:text-gray-300">
                  PDF up to 10MB
                </p>
              </div>
            </div>
            <div className="flex py-3">
              <button
                onClick={() => handleSubmit()}
                className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold
                          text-white shadow-sm hover:bg-amber-500 focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 
                          focus-visible:outline-amber-600"
              >
                Submit
              </button>
            </div>
            {/* </Form> */}
          </div>
        </div>
        {previewPdfList.length > 0 && (
          <div className="flex border-t-2 border-gray-900/10 dark:border-gray-200/100 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {/* <h2>Previews:</h2> */}
              {previewPdfList.map((preview, index) => (
                <div
                  key={preview.fileName}
                  className="flex items-center w-full justify-center rounded-md
              bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 
              text-white shadow-sm"
                >
                  <p className="border-r-2 text-xs w-3/4 text-left px-2 break-all">
                    {preview.fileName}
                  </p>
                  <p className="text-right w-1/4 px-0.5 text-gray-200">
                    {preview.fileSize} KB
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPdf;
