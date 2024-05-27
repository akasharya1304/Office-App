import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
// import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;

import {
  DateFormat,
  checkInvalidValue,
  currencyWithComma,
  numbertoCurrency,
} from "~/constant/method";
import {
  RoundOffInViewEdit,
  TotalAmountWithTaxInTableEdit,
  totalTaxWithoutRoundOffViewEdit,
} from "./HandleCalculation";
import { useSubmit } from "@remix-run/react";

import { MdPrint } from "react-icons/md";
import { w } from "build/client/assets/components-DwBtUcjY";

const BillGeneratedPDF = ({billGenData, userDetail, handleReturnURl}) => {

  const submit = useSubmit();

const BillPDF = (billGenData, userDetail, submit, handleReturnURl) => {
  if (billGenData) {
    console.log(userDetail, billGenData);
    let tableData = [];
    let tableTotalSumData = [];
    let tableTotalSumInNumberData = [];
    let tableHeaders = [];

    let tableData2 = [];
    let tableTotalSumData2 = [];
    let tableTotalSumInNumberData2 = [];
    let tableHeaders2 = [];

    let header = [
      { label: "Sl No.", key: "index" },
      { label: "Description of Goods", key: "item_name", key2: "description" },
      { label: "HSN/SAC", key: "hsn_sac" },
      { label: "Quantity", key: "quantity" },
      { label: "Rate", key: "rate" },
      { label: "per", key: "type" },
      { label: "Amount", key: "amount" },
    ];

    // Table Header Sl No., desc ...

    header.map((head, i) => {
      tableHeaders.push({
        text: head.label,
        bold: false,
        fontSize: 9,
        alignment: "center",
        margin: [0, 0, 0, 0],
        border:
          i === header.length - 1
            ? [true, false, true, true]
            : [true, false, false, true],
      });
      tableHeaders2.push({
        text: head.label,
        bold: false,
        fontSize: 9,
        alignment: "center",
        margin: [0, 0, 0, 0],
        border:
          i === header.length - 1
            ? [true, false, true, true]
            : [true, false, false, true],
      });
    });
    tableData.push(tableHeaders);
    tableData2.push(tableHeaders2);

    // Table Items Push

    billGenData?.desc_of_goods?.map((item, i) => {
      let rowData = [];
      let rowData2 = [];
      for (let j = 0; j < header.length; j++) {
        rowData.push({
          text:
            j === 0
              ? i + 1
              : header[j].key === "item_name"
              ? [
                  {
                    text: `${item[header[j].key]}\n` || "",
                    fontSize: 11,
                    bold: true,
                    rowSpan: 2,
                  },
                  !checkInvalidValue(item[header[j].key2])
                    ? {
                        text: item[header[j].key2],
                        margin: [5, 0, 0, 0],
                        italics: true,
                      }
                    : "",
                ]
              : header[j].key === "quantity"
              ? item[header[j].key] + " " + item.type
              : ["rate"].includes(header[j].key)
              ? Number(item[header[j].key]).toFixed(2)
              : ["amount"].includes(header[j].key)
              ? currencyWithComma(Number(item[header[j].key]).toFixed(2))
              : item[header[j].key],
          bold: ["quantity", "amount"].includes(header[j].key) ? true : false,
          fontSize: ["quantity", "amount"].includes(header[j].key) ? 10 : 9,
          alignment: ["item_name", "hsn_sac"].includes(header[j].key)
            ? "left"
            : ["index", "type"].includes(header[j].key)
            ? "center"
            : "right",
          margin: j === header.length - 1 ? [0, 0, 0, 2] : [0, 0, 0, 0],
          border:
            j === header.length - 1
              ? [true, false, true, false]
              : [true, false, false, false],
        });
        rowData2.push({
          text:
            j === 0
              ? i + 1
              : header[j].key === "item_name"
              ? [
                  {
                    text: `${item[header[j].key]}\n` || "",
                    fontSize: 11,
                    bold: true,
                    rowSpan: 2,
                  },
                  !checkInvalidValue(item[header[j].key2])
                    ? {
                        text: item[header[j].key2],
                        margin: [5, 0, 0, 0],
                        italics: true,
                      }
                    : "",
                ]
              : header[j].key === "quantity"
              ? item[header[j].key] + " " + item.type
              : ["rate"].includes(header[j].key)
              ? Number(item[header[j].key]).toFixed(2)
              : ["amount"].includes(header[j].key)
              ? currencyWithComma(Number(item[header[j].key]).toFixed(2))
              : item[header[j].key],
          bold: ["quantity", "amount"].includes(header[j].key) ? true : false,
          fontSize: ["quantity", "amount"].includes(header[j].key) ? 10 : 9,
          alignment: ["item_name", "hsn_sac"].includes(header[j].key)
            ? "left"
            : ["index", "type"].includes(header[j].key)
            ? "center"
            : "right",
          margin: j === header.length - 1 ? [0, 0, 0, 2] : [0, 0, 0, 0],
          border:
            j === header.length - 1
              ? [true, false, true, false]
              : [true, false, false, false],
        });
      }
      // console.log(rowData);
      tableData.push(rowData);
      tableData2.push(rowData2);
    });

    // Item > 1 SubTotal Of Amount

    if (billGenData.desc_of_goods.length > 1) {
      let rowData = [];
      let rowData2 = [];
      for (let j = 0; j < header.length; j++) {
        rowData.push({
          text:
            j < header.length - 1
              ? ""
              : currencyWithComma(
                  Number(
                    billGenData.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ).toFixed(2)
                ),
          bold: false,
          fontSize: 10,
          alignment: "right",
          margin: j === header.length - 1 ? [5, 0, 0, 5] : [0, 0, 0, 0],
          border:
            j === header.length - 1
              ? [true, true, true, false]
              : [true, false, false, false],
        });
        rowData2.push({
          text:
            j < header.length - 1
              ? ""
              : currencyWithComma(
                  Number(
                    billGenData.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ).toFixed(2)
                ),
          bold: false,
          fontSize: 10,
          alignment: "right",
          margin: j === header.length - 1 ? [5, 0, 0, 5] : [0, 0, 0, 0],
          border:
            j === header.length - 1
              ? [true, true, true, false]
              : [true, false, false, false],
        });
      }
      // console.log(rowData);
      tableData.push(rowData);
      tableData2.push(rowData2);
    }

    // Output CGST /SGST with RoundOff

    if (billGenData.desc_of_goods.length > 0) {
      let rowData = [];
      let rowData2 = [];
      for (let j = 0; j < header.length; j++) {
        rowData.push({
          text: [0, 2, 3].includes(j)
            ? ""
            : j === 1
            ? [
                {
                  text: `Output CGST @${billGenData?.output_cgst}%\n Output SGST @${billGenData?.output_sgst}%\n`,
                  bold: true,
                },
                Number(billGenData?.round_off) === 0
                  ? ""
                  : {
                      text:
                        Number(billGenData?.round_off) < 0
                          ? [
                              {
                                text: `Less:                                         `,
                                alignment: "left",
                                margin: [5, 0, 50, 0],
                                fontSize: 9,
                                italics: true,
                              },
                              {
                                text: "                                       Round Off",
                                alignment: "right",
                                margin: [0, 0, 0, 0],
                                fontSize: 10,
                                italics: true,
                                bold: true,
                              },
                            ]
                          : {
                              text: "Round Off",
                              alignment: "right",
                              margin: [0, 0, 0, 0],
                              fontSize: 10,
                              italics: true,
                              bold: true,
                            },
                    },
              ]
            : j === 4
            ? {
                text:
                  `${billGenData.output_cgst}\n${billGenData.output_sgst}\n` ||
                  "",
                fontSize: 10,
                bold: false,
                alignment: "right",
                rowSpan: Number(billGenData?.round_off) !== 0 ? 3 : 2,
              }
            : j === 5
            ? {
                text: `%\n%\n` || "",
                fontSize: 10,
                bold: false,
                alignment: "left",
                rowSpan: Number(billGenData?.round_off) !== 0 ? 3 : 2,
              }
            : j === 6
            ? [
                {
                  text:
                    `${(
                      Number(
                        billGenData.desc_of_goods.reduce(
                          (acc, curr) =>
                            Number(acc) + Number(curr?.amount || 0),
                          0
                        )
                      ) * Number((billGenData.output_cgst || 0) / 100)
                    ).toFixed(2)}\n${(
                      Number(
                        billGenData.desc_of_goods.reduce(
                          (acc, curr) =>
                            Number(acc) + Number(curr?.amount || 0),
                          0
                        )
                      ) * Number((billGenData.output_sgst || 0) / 100)
                    ).toFixed(2)}\n` || "",
                  fontSize: 10,
                  bold: true,
                  alignment: "right",
                  rowSpan: Number(billGenData?.round_off) !== 0 ? 3 : 2,
                },
                Number(billGenData?.round_off) !== 0
                  ? {
                      text:
                        Number(billGenData?.round_off) < 0
                          ? `(-)${Math.abs(
                              RoundOffInViewEdit(
                                billGenData.desc_of_goods,
                                billGenData.output_cgst,
                                billGenData.output_sgst
                              )
                            ).toFixed(2)}`
                          : `${Number(
                              RoundOffInViewEdit(
                                billGenData.desc_of_goods,
                                billGenData.output_cgst,
                                billGenData.output_sgst
                              ) || 0
                            ).toFixed(2)}`,
                      bold: true,
                      alignment: "right",
                      fontSize: 10,
                    }
                  : "",
              ]
            : "",
          bold: false,
          fontSize: 10,
          alignment: "right",
          margin:
            billGenData.desc_of_goods.length === 1
              ? [0, 40, 0, 140]
              : billGenData.desc_of_goods.length === 2
              ? [0, 0, 0, 100]
              : billGenData.desc_of_goods.length === 3
              ? [0, 0, 0, 70]
              : billGenData.desc_of_goods.length === 4
              ? [0, 0, 0, 40]
              : billGenData.desc_of_goods.length === 5
              ? [0, 0, 0, 10]
              : [0, 0, 0, 0],
          border:
            j === header.length - 1
              ? [true, false, true, false]
              : [true, false, false, false],
        });
        rowData2.push({
          text: [0, 2, 3].includes(j)
            ? ""
            : j === 1
            ? [
                {
                  text: `Output CGST @${billGenData?.output_cgst}%\n Output SGST @${billGenData?.output_sgst}%\n`,
                  bold: true,
                },
                Number(billGenData?.round_off) === 0
                  ? ""
                  : {
                      text:
                        Number(billGenData?.round_off) < 0
                          ? [
                              {
                                text: `Less:                                         `,
                                alignment: "left",
                                margin: [5, 0, 50, 0],
                                fontSize: 9,
                                italics: true,
                              },
                              {
                                text: "                                       Round Off",
                                alignment: "right",
                                margin: [0, 0, 0, 0],
                                fontSize: 10,
                                italics: true,
                                bold: true,
                              },
                            ]
                          : {
                              text: "Round Off",
                              alignment: "right",
                              margin: [0, 0, 0, 0],
                              fontSize: 10,
                              italics: true,
                              bold: true,
                            },
                    },
              ]
            : j === 4
            ? {
                text:
                  `${billGenData.output_cgst}\n${billGenData.output_sgst}\n` ||
                  "",
                fontSize: 10,
                bold: false,
                alignment: "right",
                rowSpan: Number(billGenData?.round_off) !== 0 ? 3 : 2,
              }
            : j === 5
            ? {
                text: `%\n%\n` || "",
                fontSize: 10,
                bold: false,
                alignment: "left",
                rowSpan: Number(billGenData?.round_off) !== 0 ? 3 : 2,
              }
            : j === 6
            ? [
                {
                  text:
                    `${(
                      Number(
                        billGenData.desc_of_goods.reduce(
                          (acc, curr) =>
                            Number(acc) + Number(curr?.amount || 0),
                          0
                        )
                      ) * Number((billGenData.output_cgst || 0) / 100)
                    ).toFixed(2)}\n${(
                      Number(
                        billGenData.desc_of_goods.reduce(
                          (acc, curr) =>
                            Number(acc) + Number(curr?.amount || 0),
                          0
                        )
                      ) * Number((billGenData.output_sgst || 0) / 100)
                    ).toFixed(2)}\n` || "",
                  fontSize: 10,
                  bold: true,
                  alignment: "right",
                  rowSpan: Number(billGenData?.round_off) !== 0 ? 3 : 2,
                },
                Number(billGenData?.round_off) !== 0
                  ? {
                      text:
                        Number(billGenData?.round_off) < 0
                          ? `(-)${Math.abs(
                              RoundOffInViewEdit(
                                billGenData.desc_of_goods,
                                billGenData.output_cgst,
                                billGenData.output_sgst
                              )
                            ).toFixed(2)}`
                          : `${Number(
                              RoundOffInViewEdit(
                                billGenData.desc_of_goods,
                                billGenData.output_cgst,
                                billGenData.output_sgst
                              ) || 0
                            ).toFixed(2)}`,
                      bold: true,
                      alignment: "right",
                      fontSize: 10,
                    }
                  : "",
              ]
            : "",
          bold: false,
          fontSize: 10,
          alignment: "right",
          margin:
            billGenData.desc_of_goods.length === 1
              ? [0, 40, 0, 140]
              : billGenData.desc_of_goods.length === 2
              ? [0, 0, 0, 100]
              : billGenData.desc_of_goods.length === 3
              ? [0, 0, 0, 70]
              : billGenData.desc_of_goods.length === 4
              ? [0, 0, 0, 40]
              : billGenData.desc_of_goods.length === 5
              ? [0, 0, 0, 10]
              : [0, 0, 0, 0],
          border:
            j === header.length - 1
              ? [true, false, true, false]
              : [true, false, false, false],
        });
      }
      // console.log(rowData);
      tableData.push(rowData);
      tableData2.push(rowData2);
    }

    if (billGenData.desc_of_goods.length > 0) {
      let rowData = [];
      let rowData2 = [];
      for (let j = 0; j < header.length; j++) {
        rowData.push({
          text: [0, 2, 4, 5].includes(j)
            ? ""
            : j === 1
            ? "Total"
            : j === 3
            ? {
                text: `${currencyWithComma(
                  Number(
                    billGenData.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.quantity || 0),
                      0
                    )
                  ).toFixed(0),
                  "no-dot"
                )} ${billGenData.desc_of_goods[0].type}`,
                alignment: "right",
                fontSize: 11,
                bold: true,
              }
            : j === 6
            ? {
                text: ` ₹ ${currencyWithComma(
                  TotalAmountWithTaxInTableEdit(
                    billGenData.desc_of_goods,
                    "amount",
                    billGenData.output_cgst,
                    billGenData.output_sgst
                  )
                )}`,
                alignment: "right",
                fontSize: 11,
                bold: true,
              }
            : "",
          bold: false,
          fontSize: 10,
          alignment: "right",
          margin: [0, 0, 0, 0],
          border:
            j === header.length - 1
              ? [true, true, true, true]
              : [true, true, false, true],
        });
        rowData2.push({
          text: [0, 2, 4, 5].includes(j)
            ? ""
            : j === 1
            ? "Total"
            : j === 3
            ? {
                text: `${currencyWithComma(
                  Number(
                    billGenData.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.quantity || 0),
                      0
                    )
                  ).toFixed(0),
                  "no-dot"
                )} ${billGenData.desc_of_goods[0].type}`,
                alignment: "right",
                fontSize: 11,
                bold: true,
              }
            : j === 6
            ? {
                text: ` ₹ ${currencyWithComma(
                  TotalAmountWithTaxInTableEdit(
                    billGenData.desc_of_goods,
                    "amount",
                    billGenData.output_cgst,
                    billGenData.output_sgst
                  )
                )}`,
                alignment: "right",
                fontSize: 11,
                bold: true,
              }
            : "",
          bold: false,
          fontSize: 10,
          alignment: "right",
          margin: [0, 0, 0, 0],
          border:
            j === header.length - 1
              ? [true, true, true, true]
              : [true, true, false, true],
        });
      }
      // console.log(rowData);
      tableTotalSumData.push(rowData);
      tableTotalSumData2.push(rowData2);
    }

    // Total Amount in Words

    if (billGenData.desc_of_goods.length > 0) {
      let rowData = [];
      let rowData2 = [];
      for (let j = 0; j < 2; j++) {
        rowData.push({
          text:
            j === 0
              ? [
                  {
                    text: "Amount Chargeable (in words)\n",
                    fontSize: 9,
                    bold: false,
                    margin: [5, 0, 0, 0],
                    rowSpan: 2,
                  },
                  {
                    text: `INR ${numbertoCurrency(
                      Number(
                        TotalAmountWithTaxInTableEdit(
                          billGenData.desc_of_goods,
                          "amount",
                          billGenData.output_cgst,
                          billGenData.output_sgst
                        ) || 0
                      )
                    )}`,
                    margin: [5, 0, 0, 0],
                    fontSize: 11,
                    bold: true,
                  },
                ]
              : j === 1
              ? {
                  text: "E. & O.E",
                  fontSize: 10,
                  alignment: "right",
                  bold: false,
                  margin: [0, 0, 0, 5],
                  italics: true,
                  rowSpan: 2,
                }
              : "",
          bold: false,
          fontSize: 9,
          alignment: "left",
          margin: [0, 0, 0, 0],
          border:
            j === 1 ? [false, false, true, true] : [true, false, false, true],
        });
        rowData2.push({
          text:
            j === 0
              ? [
                  {
                    text: "Amount Chargeable (in words)\n",
                    fontSize: 9,
                    bold: false,
                    margin: [5, 0, 0, 0],
                    rowSpan: 2,
                  },
                  {
                    text: `INR ${numbertoCurrency(
                      Number(
                        TotalAmountWithTaxInTableEdit(
                          billGenData.desc_of_goods,
                          "amount",
                          billGenData.output_cgst,
                          billGenData.output_sgst
                        ) || 0
                      )
                    )}`,
                    margin: [5, 0, 0, 0],
                    fontSize: 11,
                    bold: true,
                  },
                ]
              : j === 1
              ? {
                  text: "E. & O.E",
                  fontSize: 10,
                  alignment: "right",
                  bold: false,
                  margin: [0, 0, 0, 5],
                  italics: true,
                  rowSpan: 2,
                }
              : "",
          bold: false,
          fontSize: 9,
          alignment: "left",
          margin: [0, 0, 0, 0],
          border:
            j === 1 ? [false, false, true, true] : [true, false, false, true],
        });
      }
      // console.log(rowData);
      tableTotalSumInNumberData.push(rowData);
      tableTotalSumInNumberData2.push(rowData2);
    }

    const handlePdfPageData = (
      type,
      tableDATA,
      tableTotalSumDATA,
      tableTotalSumInNumberDATA
    ) => {
      let obj = [
        {
          text: "\n",
        },
        {
          columns: [
            {
              width: "55%",
              text: "Tax Invoice",
              style: "header",
              alignment: "right",
            },
            {
              text: type,
              alignment: "right",
              fontSize: 9,
              italics: true,
            },
          ],
        },
        {
          text: "\n",
        },
        {
          columns: [
            {
              width: "52%",
              table: {
                widths: ["*"],
                body: [
                  [
                    {
                      width: "60%",
                      text: [
                        {
                          text: `${userDetail.company_name}\n`,
                          bold: true,
                          fontSize: 10,
                        },
                        { text: `${userDetail.address_1}\n`, fontSize: 8 },
                        { text: `${userDetail.address_2}\n`, fontSize: 8 },
                        {
                          text: `Contact No. ${userDetail.contact_no_1}\n`,
                          fontSize: 9,
                        },
                        { text: `${userDetail.contact_no_2}\n`, fontSize: 8 },
                        {
                          text: `GSTIN/UIN: ${userDetail.gstin_uin}\n`,
                          fontSize: 8,
                        },
                        {
                          text: `State Name : ${userDetail.state?.state_name}, Code : ${userDetail.state?.state_code}\n`,
                          fontSize: 8,
                        },
                        {
                          text: `Contact: ${userDetail.phone_no}, ${userDetail.contact_no_1}\n`,
                          fontSize: 8,
                        },
                        { text: `E-Mail: ${userDetail.email}\n`, fontSize: 8 },
                      ],
                      alignment: "left",
                      lineHeight: 0.91,
                      fontSize: 10,
                      border: [true, true, true, true],
                    },
                  ],
                ],
              },
            },
            {
              width: "*",
              table: {
                widths: ["*", "*"],
                margin: [-10, -10, -10, -10],
                body: [
                  [
                    {
                      text: "Invoice No.",
                      bold: false,
                      fontSize: 9,
                      border: [false, true, true, false],
                    },
                    {
                      text: "Dated",
                      fontSize: 9,
                      border: [false, true, true, false],
                    },
                  ],
                  [
                    {
                      text: billGenData.invoice_no,
                      bold: true,
                      fontSize: 10,
                      border: [false, false, true, false],
                    },
                    {
                      text: DateFormat(billGenData.invoice_date),
                      bold: true,
                      fontSize: 10,
                      border: [false, false, true, false],
                    },
                  ],
                  [
                    {
                      text: "Delivery Note",
                      bold: false,
                      lineHeight: 1.5,
                      fontSize: 9,
                      border: [false, true, true, false],
                    },
                    {
                      text: "Mode/Terms of Payment",
                      lineHeight: 1.5,
                      fontSize: 9,
                      border: [false, true, true, false],
                    },
                  ],
                  [
                    {
                      text: "",
                      fontSize: 9,
                      border: [false, false, true, false],
                    },
                    {
                      text: "",
                      fontSize: 9,
                      border: [false, false, true, false],
                    },
                  ],
                  [
                    {
                      text: "Supplier's Ref.",
                      bold: false,
                      lineHeight: 1.6,
                      fontSize: 9,
                      border: [false, true, true, false],
                    },
                    {
                      text: "Other Reference(s)",
                      fontSize: 9,
                      lineHeight: 1.6,
                      border: [false, true, true, false],
                    },
                  ],
                  [
                    {
                      text: "",
                      fontSize: 9,
                      border: [false, false, true, true],
                    },
                    {
                      text: "",
                      fontSize: 9,
                      border: [false, false, true, true],
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          columns: [
            {
              width: "52%",
              table: {
                widths: ["*"],
                heights: [114, "*"],
                body: [
                  [
                    {
                      width: "60%",
                      text: [
                        {
                          text: `Buyer\n`,
                          fontSize: 8,
                          lineHeight: 1.3,
                          bold: false,
                        },
                        {
                          text: `${billGenData.buyer.buyer_name}\n`,
                          bold: true,
                          fontSize: 11,
                        },
                        {
                          text: `${billGenData.buyer.address}\n`,
                          fontSize: 9,
                          margin: [0, 0, 100, 0],
                        },
                        {
                          text: `GSTIN/UIN : ${billGenData?.buyer?.gstin_uin}\n`,
                          fontSize: 9,
                        },
                        {
                          text: `State Name : ${billGenData?.buyer?.state?.state_name}, Code : ${billGenData?.buyer?.state?.state_code}\n`,
                          fontSize: 9,
                        },
                      ],
                      alignment: "left",
                      lineHeight: 1.1,
                      fontSize: 10,
                      border: [true, false, true, false],
                    },
                  ],
                  [
                    {
                      width: "60%",
                      text: "",
                      border: [true, false, true, true],
                    },
                  ],
                ],
              },
            },
            {
              width: "*",
              table: {
                widths: ["*", "*"],
                margin: [-10, -10, -10, -10],
                heights: ["auto", "auto", "auto", "auto", "auto", "auto", 38],
                body: [
                  [
                    {
                      text: "Buyer's Order No.",
                      bold: false,
                      fontSize: 9,
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, false],
                    },
                    {
                      text: "Dated",
                      fontSize: 9,
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, false],
                    },
                  ],
                  [
                    {
                      text: billGenData.buyer_order_no,
                      bold: true,
                      fontSize: 10,
                      border: [false, false, true, false],
                    },
                    {
                      text: DateFormat(billGenData.buyer_order_date),
                      bold: true,
                      fontSize: 10,
                      border: [false, false, true, false],
                    },
                  ],
                  [
                    {
                      text: "Despatch Document No.",
                      bold: false,
                      lineHeight: 1.5,
                      fontSize: 9,
                      border: [false, true, true, false],
                    },
                    {
                      text: "Delivery Note Date",
                      lineHeight: 1.5,
                      fontSize: 9,
                      border: [false, true, true, false],
                    },
                  ],
                  [
                    {
                      text: "",
                      fontSize: 9,
                      border: [false, false, true, false],
                    },
                    {
                      text: "",
                      fontSize: 9,
                      border: [false, false, true, false],
                    },
                  ],
                  [
                    {
                      text: "Despatch through",
                      bold: false,
                      lineHeight: 1.6,
                      fontSize: 9,
                      border: [false, true, true, false],
                    },
                    {
                      text: "Destination",
                      fontSize: 9,
                      lineHeight: 1.6,
                      border: [false, true, true, false],
                    },
                  ],
                  [
                    {
                      text: "",
                      fontSize: 9,
                      border: [false, false, true, true],
                    },
                    {
                      text: "",
                      fontSize: 9,
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: "Terms of Delivery",
                      colSpan: 2,
                      bold: false,
                      lineHeight: 1.7,
                      fontSize: 9,
                      border: [false, true, true, true],
                    },
                  ],
                ],
              },
            },
          ],
        },
        console.log(tableData),
        {
          table: {
            headerRows: 1,
            widths: [14, "*", 45, 55, 33, 20, 60],
            // heights: ["auto".repeat(billGenData?.desc_of_goods?.length), 100],
            body: [...tableDATA],
          },
        },
        {
          table: {
            headerRows: 0,
            widths: [14, "*", 45, 55, 33, 20, 60],
            body: [...tableTotalSumDATA],
          },
        },
        {
          table: {
            headerRows: 0,
            widths: ["auto", "*"],
            body: [...tableTotalSumInNumberDATA],
          },
        },
        {
          columns: [
            {
              width: "44%",
              table: {
                widths: ["*"],
                body: [
                  [
                    {
                      text: "HSN/SAC",
                      fontSize: 11,
                      lineHeight: 1.1,
                      bold: false,
                      alignment: "center",
                      margin: [0, 0, 0, 0],
                      border: [true, false, true, false],
                    },
                  ],
                  [
                    {
                      text: "",
                      fontSize: 11,
                      bold: false,
                      alignment: "center",
                      margin: [0, 0, 0, 0],
                      border: [true, false, true, true],
                    },
                  ],
                  [
                    {
                      text: `${billGenData.desc_of_goods[0].hsn_sac}`,
                      fontSize: 10,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [true, false, true, true],
                    },
                  ],
                  [
                    {
                      text: `Total`,
                      fontSize: 10,
                      bold: true,
                      alignment: "right",
                      margin: [0, -2, 0, -2],
                      border: [true, false, true, true],
                    },
                  ],
                ],
              },
            },
            {
              width: "11%",
              table: {
                widths: ["*"],
                heights: [6, 8.3, 6, 7.7],
                body: [
                  [
                    {
                      text: "Taxable",
                      fontSize: 10,
                      bold: false,
                      alignment: "center",
                      margin: [0, -3, 0, -3],
                      border: [false, false, true, false],
                    },
                  ],
                  [
                    {
                      text: "Value",
                      fontSize: 10,
                      bold: false,
                      lineHeight: 1,
                      alignment: "center",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, false],
                    },
                  ],
                  [
                    {
                      text: `${currencyWithComma(
                        Number(
                          billGenData.desc_of_goods.reduce(
                            (acc, curr) =>
                              Number(acc) + Number(curr?.amount || 0),
                            0
                          )
                        ).toFixed(2)
                      )}`,
                      fontSize: 10,
                      bold: false,
                      alignment: "right",
                      margin: [0, -2, 0, -2],
                      border: [false, true, true, false],
                    },
                  ],
                  [
                    {
                      text: `${currencyWithComma(
                        Number(
                          billGenData.desc_of_goods.reduce(
                            (acc, curr) =>
                              Number(acc) + Number(curr?.amount || 0),
                            0
                          )
                        ).toFixed(2)
                      )}`,
                      fontSize: 10,
                      bold: true,
                      alignment: "right",
                      margin: [0, -2, 0, -2],
                      border: [false, true, true, true],
                    },
                  ],
                ],
              },
            },
            {
              width: "6%",
              table: {
                heights: [6, 6, 6, 7.7],
                widths: ["*"],
                body: [
                  [
                    {
                      text: "Central",
                      fontSize: 10,
                      bold: false,

                      alignment: "right",
                      margin: [0, -2, -23, -2],
                      border: [false, false, false, true],
                    },
                  ],
                  [
                    {
                      text: "Rate",
                      fontSize: 10,
                      bold: false,
                      alignment: "center",
                      margin: [0, -3, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: `${billGenData.output_cgst}%`,
                      fontSize: 10,
                      bold: false,
                      alignment: "right",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: ``,
                      fontSize: 10,
                      bold: true,
                      alignment: "center",
                      margin: [0, 0, 0, 0],
                      border: [false, false, true, true],
                    },
                  ],
                ],
              },
            },
            {
              width: "10%",
              table: {
                widths: ["*"],
                heights: [6, 6, 6, 6],
                body: [
                  [
                    {
                      text: "Tax",
                      fontSize: 10,
                      bold: false,
                      alignment: "center",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: "Amount",
                      fontSize: 10,
                      bold: false,
                      alignment: "center",
                      margin: [0, -3, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: `${(
                        Number(
                          billGenData.desc_of_goods.reduce(
                            (acc, curr) =>
                              Number(acc) + Number(curr?.amount || 0),
                            0
                          )
                        ) * Number((billGenData.output_cgst || 0) / 100)
                      ).toFixed(2)}`,
                      fontSize: 10,
                      bold: false,
                      alignment: "right",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: `${(
                        Number(
                          billGenData.desc_of_goods.reduce(
                            (acc, curr) =>
                              Number(acc) + Number(curr?.amount || 0),
                            0
                          )
                        ) * Number((billGenData.output_cgst || 0) / 100)
                      ).toFixed(2)}`,
                      fontSize: 10,
                      bold: true,
                      alignment: "right",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                ],
              },
            },
            {
              width: "6%",
              table: {
                heights: [6, 6, 6, 7.7],
                widths: ["*"],
                body: [
                  [
                    {
                      text: "State",
                      fontSize: 10,
                      bold: false,

                      alignment: "right",
                      margin: [0, -2, -23, -2],
                      border: [false, false, false, true],
                    },
                  ],
                  [
                    {
                      text: "Rate",
                      fontSize: 10,
                      bold: false,
                      alignment: "center",
                      margin: [0, -3, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: `${billGenData.output_sgst}%`,
                      fontSize: 10,
                      bold: false,
                      alignment: "right",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: ``,
                      fontSize: 10,
                      bold: true,
                      alignment: "center",
                      margin: [0, 0, 0, 0],
                      border: [false, false, true, true],
                    },
                  ],
                ],
              },
            },
            {
              width: "10%",
              table: {
                widths: ["*"],
                heights: [6, 6, 6, 6],
                body: [
                  [
                    {
                      text: "Tax",
                      fontSize: 10,
                      bold: false,
                      alignment: "center",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: "Amount",
                      fontSize: 10,
                      bold: false,
                      alignment: "center",
                      margin: [0, -3, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: `${(
                        Number(
                          billGenData.desc_of_goods.reduce(
                            (acc, curr) =>
                              Number(acc) + Number(curr?.amount || 0),
                            0
                          )
                        ) * Number((billGenData.output_sgst || 0) / 100)
                      ).toFixed(2)}`,
                      fontSize: 10,
                      bold: false,
                      alignment: "right",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: `${(
                        Number(
                          billGenData.desc_of_goods.reduce(
                            (acc, curr) =>
                              Number(acc) + Number(curr?.amount || 0),
                            0
                          )
                        ) * Number((billGenData.output_sgst || 0) / 100)
                      ).toFixed(2)}`,
                      fontSize: 10,
                      bold: true,
                      alignment: "right",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                ],
              },
            },
            {
              width: "13%",
              table: {
                heights: [6, 8.3, 6, 7.7],
                widths: ["*"],
                body: [
                  [
                    {
                      text: "Total",
                      fontSize: 10,
                      bold: false,
                      alignment: "center",
                      margin: [0, -3, 0, -3],
                      border: [false, false, true, false],
                    },
                  ],
                  [
                    {
                      text: "Tax Amount",
                      fontSize: 10,
                      bold: false,
                      alignment: "center",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: `${totalTaxWithoutRoundOffViewEdit(
                        billGenData.desc_of_goods,
                        billGenData.output_cgst,
                        billGenData.output_sgst
                      )}`,
                      fontSize: 10,
                      bold: false,
                      alignment: "right",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                  [
                    {
                      text: `${totalTaxWithoutRoundOffViewEdit(
                        billGenData.desc_of_goods,
                        billGenData.output_cgst,
                        billGenData.output_sgst
                      )}`,
                      fontSize: 10,
                      bold: true,
                      alignment: "right",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, true],
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          columns: [
            {
              width: "100%",
              table: {
                heights: [40],
                widths: ["auto", "*"],
                body: [
                  [
                    {
                      text: "Tax Amount (in words) : ",
                      fontSize: 11,
                      bold: false,
                      alignment: "left",
                      margin: [0, 0, 0, 0],
                      border: [true, false, false, false],
                    },
                    {
                      text: `INR ${numbertoCurrency(
                        Number(
                          totalTaxWithoutRoundOffViewEdit(
                            billGenData.desc_of_goods,
                            billGenData.output_cgst,
                            billGenData.output_sgst
                          ) || 0
                        )
                      )}`,
                      fontSize: 11,
                      bold: true,
                      alignment: "left",
                      margin: [5, 0, 0, 0],
                      border: [false, false, true, false],
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          columns: [
            {
              width: "100%",
              table: {
                heights: [8, 8, 8, 8],
                widths: ["20%", "25%", "13%", "42%"],
                body: [
                  [
                    {
                      text: "",
                      fontSize: 9,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [true, false, false, false],
                    },
                    {
                      text: "",
                      fontSize: 9,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [false, false, false, false],
                    },
                    {
                      text: "Comany's Bank Details",
                      fontSize: 9,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, -30, -2],
                      border: [false, false, false, false],
                    },
                    {
                      text: "",
                      fontSize: 9,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, false],
                    },
                  ],
                  [
                    {
                      text: "",
                      fontSize: 9,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [true, false, false, false],
                    },
                    {
                      text: "",
                      fontSize: 9,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [false, false, false, false],
                    },
                    {
                      text: `Bank Name `,
                      fontSize: 9,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [false, false, false, false],
                    },
                    {
                      text: ` : ${userDetail.bank_name} -${userDetail.bank_account_no}`,
                      fontSize: 9.5,
                      bold: true,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, false],
                    },
                  ],
                  [
                    {
                      text: "",
                      fontSize: 9,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [true, false, false, false],
                    },
                    {
                      text: "",
                      fontSize: 9,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [false, false, false, false],
                    },
                    {
                      text: `A/c No. `,
                      fontSize: 9,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [false, false, false, false],
                    },
                    {
                      text: `: ${userDetail.bank_account_no}`,
                      fontSize: 9.5,
                      bold: true,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, false],
                    },
                  ],
                  [
                    {
                      text: `Company's PAN `,
                      fontSize: 9,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [true, false, false, false],
                    },
                    {
                      text: ` : ${userDetail.pan_no}`,
                      fontSize: 9.5,
                      bold: true,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [false, false, false, false],
                    },
                    {
                      text: `Branch & IFS Code`,
                      fontSize: 9,
                      bold: false,
                      alignment: "left",
                      margin: [0, -2, -10, -2],
                      border: [false, false, false, false],
                    },
                    {
                      text: ` : ${userDetail.branch}, ${userDetail.ifsc}`,
                      fontSize: 9.5,
                      bold: true,
                      alignment: "left",
                      margin: [0, -2, 0, -2],
                      border: [false, false, true, false],
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          columns: [
            {
              width: "100%",
              table: {
                widths: ["46%", "54%"],
                body: [
                  [
                    {
                      text: [
                        {
                          text: "Declaration\n",
                          decoration: "underline",
                          fontSize: 9,
                          bold: false,
                        },
                        {
                          text: "We declare that this invoice shows the actual price of the\n goods described and that all particulars are true and correct.",
                          fontSize: 8.5,
                        },
                      ],
                      margin: [0, 5, 0, 5],
                      border: [true, false, false, true],
                    },
                    [
                      {
                        text: "",
                        margin: [0, 0, 0, 0],
                        fontSize: 10,
                        border: [true, true, false, true],
                      },
                      {
                        text: "for Arvind Print Pack\n\n\nAuthorised Signatory",
                        margin: [0, 0, 0, 0],
                        alignment: "right",
                        fontSize: 10,
                        border: [false, true, true, true],
                      },
                    ],
                  ],
                ],
              },
            },
          ],
        },
        {
          columns: [
            {
              width: "100%",
              text: "This is a Computer Generated Invoice",
              fontSize: 10,
              margin: [0, 5, 0, 5],
              alignment: "center",
              pageBreak: type === "(ORIGINAL FOR RECIPIENT)" && "after",
            },
          ],
        },
      ];
      return obj;
    };

    let firstPageData = handlePdfPageData(
      "(ORIGINAL FOR RECIPIENT)",
      tableData,
      tableTotalSumData,
      tableTotalSumInNumberData
    );
    let secondPageData = handlePdfPageData(
      "(DUPLICATE FOR TRANSPORTER)",
      tableData2,
      tableTotalSumData2,
      tableTotalSumInNumberData2
    );

    let combinedData = [...firstPageData, ...secondPageData];
    // console.log(combinedData)

    var dd = {
      info: {
        title: userDetail.company_name,
        author: "",
        subject: ``,
        keywords: "",
      },
      pageOrientation: "portrait",
      pageMargins: [25, 5, 25, 5],
      content: combinedData,
      styles: {
        header: {
          fontSize: 12,
          bold: true,
        },
      },
    };
    
    pdfMake.createPdf(dd).getBuffer(function(buffer) {
      // Convert the buffer to a base64 string
      // const base64 = buffer.toString('base64');
      // let base64Data = JSON.stringify(base64)
      const pdfBlob = new Blob([new Uint8Array(buffer)], { type: 'application/pdf' });


      // Create a URL for the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      if(typeof window !== 'undefined') {
        window.open(pdfUrl, '_blank');
      }

      handleReturnURl(pdfUrl)
  
      // Submit the base64 string to the server
      // submit(
      //   { base64Data: base64Data },
      //   { method: "post" }
      // );
    });
  }
};

return (
  <span>
  <button
    className="focus:outline-none"
    onClick={() => {
      BillPDF(billGenData, userDetail, submit, handleReturnURl);
    }}
  >
    <MdPrint className="text-3xl text-gray-500 dark:text-gray-400" />
  </button>
</span>
)

}

export { BillGeneratedPDF }
