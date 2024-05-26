import { LinkButton } from "~/components/comman/Button";
import INTERNALROUTES from "~/constant/InternalRoutes";
import { MdOutlineEdit } from "react-icons/md";
import { DateFormat, numbertoCurrency } from "~/constant/method";
import {
  RoundOffInViewEdit,
  TotalAmountWithTaxInTableEdit,
  totalTaxWithoutRoundOffViewEdit,
} from "./HandleCalculation";
import { BillPDF } from "./BillPDF";
import { MdPrint } from "react-icons/md";
import { useEffect, useState } from "react";

const DisplayBill = ({ billGenData, userDetail }) => {
  const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

  return (
    <div className="min-w-[1250px] max-w-[95%] h-full mt-8 pb-2">
      <div className="flex font-bold text-xl justify-between mb-6 items-center w-full text-gray-500 dark:text-gray-400">
        <span></span>
        <span>Tax Invoice</span>
        <span className="">
      <button
        className="focus:outline-none" 
        onClick={() => BillPDF(billGenData, userDetail)}
        >
            <MdPrint className="text-3xl text-gray-500 dark:text-gray-400" />
          </button>
      </span>
      </div>
      <div className="overflow-x-auto">
        <div className="border-2 dark:border-whiteColor">
          <div className="flex">
            <div className="flex flex-col border dark:border-whiteColor w-1/2 pl-2 pt-2">
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
                {userDetail.company_name}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {userDetail.address_1}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {userDetail.address_2}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                Contact No. {userDetail.contact_no_1}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {userDetail.contact_no_2}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                GSTIN / UIN: {userDetail.gstin_uin}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                State Name: {userDetail.state?.state_name}, Code:{" "}
                {userDetail.state?.state_code}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                Contact : {userDetail.phone_no}, {userDetail.contact_no_1}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                E-Mail : {userDetail.email}
              </span>
            </div>
            <div className="grid grid-cols-2 w-1/2">
              <div className="flex flex-col border dark:border-whiteColor px-2">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Invoice No.
                </span>
                <span className="w-36 xs:w-fit mt-1 text-gray-400 dark:text-gray-400 font-bold text-xs sm:text-lg sm:leading-6">
                  {billGenData.invoice_no}
                </span>
              </div>
              <div className="flex flex-col border dark:border-whiteColor px-2">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Dated
                </span>
                <span className="w-36 xs:w-fit mt-1 text-gray-400 dark:text-gray-400 font-bold text-xs sm:text-lg sm:leading-6">
                  {DateFormat(billGenData.invoice_date)}
                </span>
              </div>
              <div className="flex border dark:border-whiteColor px-2">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Delivery Note
                </span>
              </div>
              <div className="flex border dark:border-whiteColor px-2">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Mode/Terms of Payment
                </span>
              </div>
              <div className="flex border dark:border-whiteColor px-2">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Supplier's Ref
                </span>
              </div>
              <div className="flex border dark:border-whiteColor px-2">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Other Reference(s)
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col border dark:border-whiteColor w-1/2 pl-2">
              <span className="w-fit font-semibold text-gray-500 dark:text-gray-500 text-xs leading-5">
                Buyer
              </span>
              <span className="w-36 xs:w-60 text-gray-400 dark:text-gray-400 font-bold text-xs sm:text-lg sm:leading-6">
                {billGenData.buyer.buyer_name}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-lg sm:leading-5 mt-2 ml-4">
                {billGenData?.buyer?.address || ""}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-lg sm:leading-5 ml-4">
                GSTIN/UIN : {billGenData?.buyer?.gstin_uin || ""}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-lg sm:leading-5 ml-4">
                State Name : {billGenData?.buyer?.state?.state_name || ""}, Code
                : {billGenData?.buyer?.state?.state_code || ""}
              </span>
            </div>
            <div className="grid grid-cols-2 w-1/2">
              <div className="flex flex-col border dark:border-whiteColor px-2">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Buyer Order No.
                </span>
                <span className="w-36 xs:w-fit mt-1 mb-2 text-gray-400 dark:text-gray-400 font-bold text-xs sm:text-lg sm:leading-6">
                  {billGenData.buyer_order_no}
                </span>
              </div>
              <div className="flex flex-col border dark:border-whiteColor px-2">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Dated
                </span>
                <span className="w-36 xs:w-fit mt-1 mb-2 text-gray-400 dark:text-gray-400 font-bold text-xs sm:text-lg sm:leading-6">
                  {DateFormat(billGenData.buyer_order_date)}
                </span>
              </div>
              <div className="flex border dark:border-whiteColor px-2 h-10">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Despatch Document No.
                </span>
              </div>
              <div className="flex border dark:border-whiteColor px-2 h-10">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Delivery Note Date
                </span>
              </div>
              <div className="flex border dark:border-whiteColor px-2 h-10">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Despatch through
                </span>
              </div>
              <div className="flex border dark:border-whiteColor px-2 h-10">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Destination
                </span>
              </div>
              <div className="flex px-2 h-16">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Terms of Delivery
                </span>
              </div>
            </div>
          </div>
          <div className="flex border-y dark:border-whiteColor min-h-[680px] text-gray-500 dark:text-gray-500">
            <div className="flex flex-col h-full w-[3%] min-h-[680px] text-gray-500 dark:text-gray-500">
              <div className="flex-none grow-0 border-r border-b dark:border-whiteColor h-14 text-center">
                Sl No.
              </div>
              <div className="grow basis-[90%] h-14 border-r border-b dark:border-whiteColor pt-2">
                {billGenData.desc_of_goods.map((data, index) => {
                  return (
                    <span
                      key={index + "items"}
                      className="flex h-20 font-semibold justify-center w-full my-1.5"
                    >
                      {index + 1}
                    </span>
                  );
                })}
              </div>
              <div className="flex-none grow-0 h-8 border-r dark:border-whiteColor "></div>
            </div>
            <div className="flex flex-col h-full w-[50%] min-h-[680px] text-gray-500 dark:text-gray-500">
              <div className="flex-none grow-0 border-r border-b dark:border-whiteColor h-14 text-center">
                Description of Goods
              </div>
              <div className="grow basis-[90%] h-14 border-r border-b dark:border-whiteColor ">
                {billGenData.desc_of_goods.map((data, index) => {
                  return (
                    <div
                      className="flex my-1 h-[90px]"
                      key={index || "itemField"}
                    >
                      <div className="flex flex-col gap-1 ml-2">
                        <span className="w-36 xs:w-60">{data.item_name}</span>
                        <span className="w-36 xs:w-96">{data.description}</span>
                      </div>
                    </div>
                  );
                })}
                <div
                  className={`flex flex-col justify-end ${
                    billGenData.desc_of_goods.length > 1 ? "mt-14" : "mt-8"
                  }  pr-2 text-gray-500 dark:text-gray-500 font-bold text-sm sm:text-base sm:leading-6 `}
                >
                  <span className="w-full text-end pr-1">
                    Output CGST @{billGenData?.output_cgst}%
                  </span>
                  <span className="w-full text-end pr-1">
                    Output SGST @{billGenData?.output_sgst}%
                  </span>
                  {Number(billGenData?.round_off) !== 0 && (
                    <span
                      className={` w-full flex italic ${
                        Number(billGenData?.round_off) < 0
                          ? "justify-between"
                          : "justify-end"
                      } px-1 `}
                    >
                      {Number(billGenData?.round_off) < 0 && (
                        <span className="pl-2">Less :</span>
                      )}
                      <span>Round Off</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-none grow-0 h-8 border-r dark:border-whiteColor text-end pr-2 font-bold text-sm sm:text-base sm:leading-6">
                Total
              </div>
            </div>
            <div className="flex flex-col h-full w-[8%] min-h-[680px] text-gray-500 dark:text-gray-500">
              <div className="flex-none grow-0 border-r border-b dark:border-whiteColor h-14 text-center">
                HSN/SAC
              </div>
              <div className="grow basis-[90%] h-14 border-r border-b dark:border-whiteColor font-bold text-sm sm:text-base sm:leading-6">
                {billGenData.desc_of_goods.map((data, index) => {
                  return (
                    <span
                      key={index + "hsn_sac"}
                      className="flex items-center h-[90px] pb-6 font-semibold justify-center w-full"
                    >
                      {data?.hsn_sac}
                    </span>
                  );
                })}
              </div>
              <div className="flex-none grow-0 h-8 border-r dark:border-whiteColor "></div>
            </div>
            <div className="flex flex-col h-full w-[15%] min-h-[680px] text-gray-500 dark:text-gray-500">
              <div className="flex-none grow-0 border-r border-b dark:border-whiteColor h-14 text-center">
                Quantity
              </div>
              <div className="grow basis-[90%] h-14 border-r border-b dark:border-whiteColor text-end pr-2 font-bold text-sm sm:text-base sm:leading-6">
                {billGenData.desc_of_goods.map((data, index) => {
                  return (
                    <div
                      key={index + "quantity"}
                      className="flex justify-end items-center text-end w-full h-[90px] pb-6"
                    >
                      <span className="flex mx-1">{data?.quantity}</span>
                      <span>{data?.type}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex-none grow-0 h-8 border-r dark:border-whiteColor text-end pr-2 font-extrabold text-sm sm:text-base sm:leading-6">
                {Number(
                  billGenData.desc_of_goods.reduce(
                    (acc, curr) => Number(acc) + Number(curr?.quantity || 0),
                    0
                  )
                ).toFixed(0)}
                {"  "}
                {billGenData.desc_of_goods.length > 0 &&
                  billGenData.desc_of_goods[0].type}
              </div>
            </div>
            <div className="flex flex-col h-full w-[10%] min-h-[680px] text-gray-500 dark:text-gray-500">
              <div className="flex-none grow-0 border-r border-b dark:border-whiteColor h-14 text-center">
                Rate
              </div>
              <div className="grow basis-[90%] h-14 border-r border-b dark:border-whiteColor text-end pr-2 font-bold text-sm sm:text-base sm:leading-6">
                {billGenData.desc_of_goods.map((data, index) => {
                  return (
                    <div
                      key={index + "rate"}
                      className="flex justify-end items-center h-[90px] pb-6"
                    >
                      <span className="flex">{data?.rate}</span>
                    </div>
                  );
                })}
                <div
                  className={` flex flex-col justify-end ${
                    billGenData.desc_of_goods.length > 1 ? "mt-14" : "mt-8"
                  } pr-1 text-gray-500 dark:text-gray-500 font-bold text-sm sm:text-base sm:leading-6 `}
                >
                  <span className="w-full">{billGenData.output_cgst}</span>
                  <span className="w-full">{billGenData.output_sgst}</span>
                </div>
              </div>
              <div className="flex-none grow-0 h-8 border-r dark:border-whiteColor"></div>
            </div>
            <div className="flex flex-col h-full w-[6%] min-h-[680px] text-gray-500 dark:text-gray-500">
              <div className="flex-none grow-0 border-r border-b dark:border-whiteColor h-14 text-center">
                per
              </div>
              <div className="grow basis-[90%] h-14 border-r border-b dark:border-whiteColor text-center  font-bold text-sm sm:text-base sm:leading-6">
                {billGenData.desc_of_goods.map((data, index) => {
                  return (
                    <div
                      key={index + "type"}
                      className="flex justify-center items-center h-[90px] pb-6"
                    >
                      <span className="flex mr-2">{data.type}</span>
                    </div>
                  );
                })}
                <div
                  className={`flex flex-col justify-start ${
                    billGenData.desc_of_goods.length > 1 ? "mt-14" : "mt-8"
                  } pl-2 text-gray-500 dark:text-gray-500 font-bold text-sm sm:text-base sm:leading-6 `}
                >
                  <span className="w-full text-start pl-1">%</span>
                  <span className="w-full text-start pl-1">%</span>
                </div>
              </div>
              <div className="flex-none grow-0 h-8 border-r dark:border-whiteColor"></div>
            </div>
            <div className="flex flex-col h-full w-[13%] min-h-[680px] text-gray-500 dark:text-gray-500">
              <div className="flex-none grow-0 border-r border-b dark:border-whiteColor h-14 text-center">
                Amount
              </div>
              <div className="grow basis-[90%] h-14 border-r border-b dark:border-whiteColor text-end pr-2 font-extrabold text-lg sm:text-xl sm:leading-6">
                {billGenData.desc_of_goods.map((data, index) => {
                  return (
                    <span
                      key={index + "amount"}
                      className="flex items-center h-[90px] pb-6 font-semibold justify-end w-full"
                    >
                      {data.amount}
                    </span>
                  );
                })}
                {billGenData.desc_of_goods.length > 1 && (
                  <span className="flex items-center justify-end ml-3 pr-1 font-semibold w-[95%] border-t dark:border-whiteColor">
                    {Number(
                      billGenData.desc_of_goods.reduce(
                        (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                        0
                      )
                    ).toFixed(2)}
                  </span>
                )}
                <div className="flex flex-col justify-start mt-8 pl-2 text-gray-500 dark:text-gray-500 font-semibold text-lg sm:text-lg sm:leading-5">
                  <span className="w-full text-end pl-1">
                    {(
                      Number(
                        billGenData.desc_of_goods.reduce(
                          (acc, curr) =>
                            Number(acc) + Number(curr?.amount || 0),
                          0
                        )
                      ) * Number((billGenData.output_cgst || 0) / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="w-full text-end pl-1">
                    {(
                      Number(
                        billGenData.desc_of_goods.reduce(
                          (acc, curr) =>
                            Number(acc) + Number(curr?.amount || 0),
                          0
                        )
                      ) * Number((billGenData.output_sgst || 0) / 100)
                    ).toFixed(2)}
                  </span>
                  <span>
                    {RoundOffInViewEdit(
                      billGenData.desc_of_goods,
                      billGenData.output_cgst,
                      billGenData.output_sgst
                    ) < 0
                      ? `(-)${Math.abs(
                          RoundOffInViewEdit(
                            billGenData.desc_of_goods,
                            billGenData.output_cgst,
                            billGenData.output_sgst
                          )
                        ).toFixed(2)}`
                      : RoundOffInViewEdit(
                          billGenData.desc_of_goods,
                          billGenData.output_cgst,
                          billGenData.output_sgst
                        ) > 0
                      ? Number(
                          RoundOffInViewEdit(
                            billGenData.desc_of_goods,
                            billGenData.output_cgst,
                            billGenData.output_sgst
                          ) || 0
                        ).toFixed(2)
                      : null}
                  </span>
                </div>
              </div>
              <div className="flex-none grow-0 h-8 border-r dark:border-whiteColor text-end pr-2 font-extrabold text-lg sm:text-lg sm:leading-6">
                ₹{" "}
                {TotalAmountWithTaxInTableEdit(
                  billGenData.desc_of_goods,
                  "amount",
                  billGenData.output_cgst,
                  billGenData.output_sgst
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between border dark:border-whiteColor h-14 text-gray-500 dark:text-gray-500">
            <div className="flex flex-col px-2">
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                Amount Chargeable (in words)
              </span>
              <span className="w-fit font-extrabold leading-4 text-gray-500 dark:text-gray-400 text-base sm:text-lg">
                INR{" "}
                {numbertoCurrency(
                  Number(
                    TotalAmountWithTaxInTableEdit(
                      billGenData.desc_of_goods,
                      "amount",
                      billGenData.output_cgst,
                      billGenData.output_sgst
                    ) || 0
                  )
                )}
              </span>
            </div>
            <div className="flex px-2">
              <span className="w-fit italic text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                E. & O.E
              </span>
            </div>
          </div>
          <div className="flex justify-between border-r dark:border-whiteColor h-14 text-gray-500 dark:text-gray-500">
            <div className="flex justify-center w-3/5 border-r dark:border-whiteColor h-14 text-gray-500 dark:text-gray-500">
              HSN/SAC
            </div>
            <div className="flex justify-center text-center w-[10%] px-3 border-r dark:border-whiteColor h-14 text-gray-500 dark:text-gray-500">
              Taxable Value
            </div>
            <div className="flex flex-col text-center w-[20%] border-r dark:border-whiteColor h-14 text-gray-500 dark:text-gray-500">
              <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                Central Tax
              </span>
              <div className="flex h-8">
                <span className="w-1/2 font-bold border-r border-t dark:border-whiteColor text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Rate
                </span>
                <span className="w-1/2 font-bold border-t dark:border-whiteColor text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Amount
                </span>
              </div>
            </div>
            <div className="flex flex-col text-center w-[20%] border-r dark:border-whiteColor h-14 text-gray-500 dark:text-gray-500">
              <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                State Tax
              </span>
              <div className="flex h-8">
                <span className="w-1/2 font-bold border-r border-t dark:border-whiteColor text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Rate
                </span>
                <span className="w-1/2 font-bold border-t dark:border-whiteColor text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Amount
                </span>
              </div>
            </div>
            <div className="flex justify-center text-center px-3 w-[12%] h-14 text-gray-500 dark:text-gray-500">
              Total Tax Amount
            </div>
          </div>
          <div className="flex justify-between border-r border-t dark:border-whiteColor h-6 text-gray-500 dark:text-gray-500">
            <div className="flex justify-start w-3/5 pl-2 border-r dark:border-whiteColor text-gray-500 dark:text-gray-500">
              {billGenData.desc_of_goods[0]?.hsn_sac}
            </div>
            <div className="flex justify-end text-center w-[10%] px-1 border-r dark:border-whiteColor text-gray-500 dark:text-gray-500">
              {
                <span className="pr-1 font-semibold">
                  {Number(
                    billGenData.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ).toFixed(2)}
                </span>
              }
            </div>
            <div className="flex text-end w-[20%] border-r dark:border-whiteColor text-gray-500 dark:text-gray-500">
              <span className="w-1/2 font-bold border-r px-1 dark:border-whiteColor text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {billGenData.output_cgst}%
              </span>
              <span className="w-1/2 font-bold px-1 text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {(
                  Number(
                    billGenData.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ) * Number((billGenData.output_cgst || 0) / 100)
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex text-end w-[20%] border-r dark:border-whiteColor text-gray-500 dark:text-gray-500">
              <span className="w-1/2 font-bold border-r px-1 dark:border-whiteColor text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {billGenData.output_sgst}%
              </span>
              <span className="w-1/2 font-bold px-1 text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {(
                  Number(
                    billGenData.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ) * Number((billGenData.output_sgst || 0) / 100)
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-end text-center px-1 w-[12%] text-gray-500 dark:text-gray-500">
              {totalTaxWithoutRoundOffViewEdit(
                billGenData.desc_of_goods,
                billGenData.output_cgst,
                billGenData.output_sgst
              )}
            </div>
          </div>
          <div className="flex justify-between border-r border-t dark:border-whiteColor h-6 text-gray-500 dark:text-gray-500">
            <div className="flex justify-end w-3/5 pr-2 border-r dark:border-whiteColor text-gray-500 dark:text-gray-500">
              Total
            </div>
            <div className="flex justify-end text-center w-[10%] px-1 border-r font-bold dark:border-whiteColor text-gray-500 dark:text-gray-400">
              {
                <span className="pr-1 font-semibold">
                  {Number(
                    billGenData.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ).toFixed(2)}
                </span>
              }
            </div>
            <div className="flex text-end w-[20%] border-r dark:border-whiteColor text-gray-500 dark:text-gray-400">
              <span className="w-1/2 font-bold border-r px-1 dark:border-whiteColor text-xs sm:text-sm sm:leading-6"></span>
              <span className="w-1/2 font-bold px-1 text-xs sm:text-sm sm:leading-6">
                {(
                  Number(
                    billGenData.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ) * Number((billGenData.output_cgst || 0) / 100)
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex text-end w-[20%] border-r dark:border-whiteColor text-gray-500 dark:text-gray-400">
              <span className="w-1/2 font-bold border-r px-1 dark:border-whiteColor text-xs sm:text-sm sm:leading-6"></span>
              <span className="w-1/2 font-bold px-1 text-xs sm:text-sm sm:leading-6">
                {(
                  Number(
                    billGenData.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ) * Number((billGenData.output_sgst || 0) / 100)
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-end text-center px-1 w-[12%] text-gray-500 dark:text-gray-400">
              {totalTaxWithoutRoundOffViewEdit(
                billGenData.desc_of_goods,
                billGenData.output_cgst,
                billGenData.output_sgst
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between border dark:border-whiteColor h-64 text-gray-500 dark:text-gray-500">
            <div className="flex items-center px-2 w-full h-10 pt-2">
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                Tax Amount (in words) :
              </span>
              <span className="w-fit ml-2 font-extrabold leading-4 text-gray-500 dark:text-gray-400 text-base sm:text-lg">
                INR{" "}
                {numbertoCurrency(
                  Number(
                    totalTaxWithoutRoundOffViewEdit(
                      billGenData.desc_of_goods,
                      billGenData.output_cgst,
                      billGenData.output_sgst
                    ) || 0
                  )
                )}
              </span>
            </div>
            <div className="flex w-full h-4/5">
              <div className="flex flex-col justify-end px-1 pb-6 w-1/2 h-full">
                <div className="flex justify-between items-center px-2 w-3/5">
                  <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                    Company's PAN
                  </span>
                  <span className="w-fit ml-2 font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-base sm:leading-4">
                    : {userDetail?.pan_no}
                  </span>
                </div>
                <div className="flex px-2 w-full">
                  <span className="w-fit text-gray-500 underline dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                    Declaration
                  </span>
                </div>
                <div className="flex flex-col px-2 w-full font-semibold leading-4">
                  <span className="w-fit tracking-wider text-gray-500 dark:text-gray-500 text-xs sm:text-sm">
                    We declare that this invoice shows the actual price of the
                    goods
                  </span>
                  <span className="w-fit tracking-wider text-gray-500 dark:text-gray-500 text-xs sm:text-sm">
                    described and that all particulars are true and correct
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-end w-1/2">
                <div className="flex px-2 w-full">
                  <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                    Company's Bank Details
                  </span>
                </div>
                <div className="flex justify-between items-center px-2 w-[90%]">
                  <span className="w-fit font-semibold tracking-wider text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                    Bank Name
                  </span>
                  <span className="w-fit ml-2 font-extrabold text-gray-500 dark:text-gray-400 text-xs sm:text-sm sm:leading-5">
                    : {userDetail?.bank_name} -{userDetail?.bank_account_no}
                  </span>
                </div>
                <div className="flex justify-between items-center px-2 w-[66%]">
                  <span className="w-fit font-semibold tracking-wider text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                    A/c No.
                  </span>
                  <span className="w-fit ml-2 font-extrabold text-gray-500 dark:text-gray-400 text-xs sm:text-sm sm:leading-5">
                    : {userDetail?.bank_account_no}
                  </span>
                </div>
                <div className="flex justify-between items-center px-2 w-[100%]">
                  <span className="w-fit font-semibold tracking-wider text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                    Branch & IFS Code
                  </span>
                  <span className="w-fit ml-2 font-extrabold text-gray-500 dark:text-gray-400 text-xs sm:text-sm sm:leading-5">
                    : {userDetail?.branch} & {userDetail?.ifsc}
                  </span>
                </div>
                <div className="flex flex-col justify-between items-start w-full h-20 border-t-2 border-l-2 dark:border-whiteColor">
                  <div className="flex justify-end items-start px-2 w-full font-bold text-xs sm:text-sm sm:leading-5">
                    for {userDetail?.company_name}
                  </div>
                  <div className="flex justify-end tracking-tighter items-start px-2 w-full font-bold text-xs sm:text-sm sm:leading-5">
                    Authorised Signatory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 justify-start items-center w-fit my-8">
          <LinkButton
            path={`${INTERNALROUTES.BILLS}/${billGenData.id}/edit`}
            icon={<MdOutlineEdit />}
            text="EDIT"
          />
          <LinkButton
            path={INTERNALROUTES.BILLS}
            text="CANCEL"
            variant="text"
          />
          <button onClick={() => BillPDF(billGenData, userDetail)}>
            <MdPrint className="text-3xl text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayBill;
