import { useSubmit } from "@remix-run/react";
import { Button, LinkButton } from "~/components/comman/Button";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import INTERNALROUTES from "~/constant/InternalRoutes";
import {
  DatePicker,
  DecimalField,
  NumberField,
  Select,
  TextArea,
  TextField,
} from "~/components/comman/InputField";
import {
  DateFormat,
  PayloadDateFormat,
  checkInvalidValue,
  checkWord,
  numbertoCurrency,
} from "~/constant/method";
import {
  RoundOffInViewEdit,
  TotalAmountWithTaxInTableEdit,
  totalTaxWithoutRoundOffViewEdit,
} from "./HandleCalculation";
import moment from "moment";

const ItemFields = ({
  key,
  totalCount,
  itemCount,
  billData,
  itemsGoods,
  handleFormValue,
  handlePlusButton,
  handleMinusButton,
}) => {
  return (
    <div className="flex my-1" key={key || "itemField"}>
      <div className="flex flex-col gap-1 ml-2">
        <span className="w-36 xs:w-60">
          <Select
            name={`item_${itemCount}`}
            defaultValue={
              billData && billData.item_id !== undefined ? billData.item_id : ""
            }
            options={itemsGoods}
            handleFormValue={handleFormValue}
            valueKey="id"
            labelKey="item_name"
            required={true}
          />
        </span>
        <span className="w-36 xs:w-96">
          <TextArea
            name={`description_${itemCount}`}
            defaultValue={
              billData && billData.description !== undefined
                ? billData.description
                : ""
            }
            handleFormValue={handleFormValue}
            minHeight="min-h-[40px]"
            fontSize="text-sm"
          />
        </span>
      </div>
      {itemCount === totalCount && (
        <div className="ml-4 mt-4">
          <button
            className="relative scale-75 rounded-full h-10 max-h-[40px] w-10 max-w-[40px] 
          select-none bg-amber-600 text-center align-middle font-sans text-xs 
          font-medium uppercase text-white transition-all 
          hover:shadow-lg focus:opacity-[0.85] focus:shadow-none 
          active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 
          disabled:shadow-none"
            type="button"
            data-ripple-light="true"
            onClick={handlePlusButton}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <FaPlus />
            </span>
          </button>
        </div>
      )}
      {itemCount === totalCount && (
        <div className="ml-20 mt-4">
          <button
            className="relative scale-75 rounded-full h-10 max-h-[40px] w-10 max-w-[40px] 
          select-none bg-red-600 text-center align-middle font-sans text-xs 
          font-medium uppercase text-white transition-all 
          hover:shadow-lg focus:opacity-[0.85] focus:shadow-none 
          active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 
          disabled:shadow-none"
            type="button"
            data-ripple-light="true"
            onClick={() => handleMinusButton(itemCount)}
          >
            <span className=" absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <FaMinus className="scale-125"/>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

const EditBills = ({ userDetail, buyer, itemsGoods, billDataById }) => {
  const [formError, setFormError] = useState({});
  const [billData, setBillData] = useState(billDataById);
  const [itemCount, setItemCount] = useState(1);
  const submit = useSubmit();

  useEffect(() => {
    // console.log(formError, billData);
  }, [formError, billData]);

  useEffect(() => {
    // console.log("inside useEffect");
    setBillData(billDataById);
    setItemCount(billDataById?.desc_of_goods?.length);
  }, [billDataById]);

  const handleFormValue = (label, data) => {
    console.log(label, " : ", data);
    let defaultItem = {
      amount: 0,
      description: "",
      hsn_sac: "",
      item_id: "",
      item_name: "",
      quantity: "",
      rate: "",
      type: "Pcs",
    };
    let Label =
      ["description", "quantity", "rate", "type", "item"].filter((word) =>
        String(label).includes(word)
      ).length > 0;
    if (Label) {
      let [actualKey, itemIndex] = label.split("_");
      let updatedData = JSON.parse(JSON.stringify(billData));
      if (checkInvalidValue(updatedData.desc_of_goods[itemIndex - 1])) {
        updatedData.desc_of_goods[itemIndex - 1] = defaultItem;
        if (actualKey === "item") {
          updatedData.desc_of_goods[itemIndex - 1].item_id = data;
          updatedData.desc_of_goods[itemIndex - 1].item_name = itemsGoods.find(
            (d) => d.id === data
          )?.item_name;
          updatedData.desc_of_goods[itemIndex - 1].hsn_sac = String(itemsGoods.find(
            (d) => d.id === data
          )?.hsn_sac);
          updatedData.output_cgst = itemsGoods.find((d) => d.id === data)?.cgst;
          updatedData.output_sgst = itemsGoods.find((d) => d.id === data)?.sgst;
        } else {
          updatedData.desc_of_goods[itemIndex - 1][actualKey] = actualKey === 'rate' ? Number(data) : data;
          updatedData.desc_of_goods[itemIndex - 1].amount = Number(
            (
              Number(updatedData.desc_of_goods[itemIndex - 1]?.rate || 0) *
              Number(updatedData.desc_of_goods[itemIndex - 1]?.quantity || 0)
            ).toFixed(2)
          );
        }
      } else {
        if (actualKey === "item") {
          updatedData.desc_of_goods[itemIndex - 1].item_id = data;
          updatedData.desc_of_goods[itemIndex - 1].item_name = itemsGoods.find(
            (d) => d.id === data
          )?.item_name;
          updatedData.desc_of_goods[itemIndex - 1].hsn_sac = String(itemsGoods.find(
            (d) => d.id === data
          )?.hsn_sac);
          updatedData.output_cgst = itemsGoods.find((d) => d.id === data)?.cgst;
          updatedData.output_sgst = itemsGoods.find((d) => d.id === data)?.sgst;
        } else {
          updatedData.desc_of_goods[itemIndex - 1][actualKey] = actualKey === 'rate' ? Number(data) : data;
          updatedData.desc_of_goods[itemIndex - 1].amount = Number(
            (
              Number(updatedData.desc_of_goods[itemIndex - 1]?.rate || 0) *
              Number(updatedData.desc_of_goods[itemIndex - 1]?.quantity || 0)
            ).toFixed(2)
          );
        }
      }
      setBillData(updatedData);
    } else {
      setBillData((preValue) => {
        return {
          ...preValue,
          [label]: label === "buyer" ? buyer.find((d) => d.id === data) : data,
        };
      });
    }
  };

  const handleError = (label, data) => {
    setFormError((preValue) => {
      return {
        ...preValue,
        [label]: data,
      };
    });
  };

  const handlePlusButton = () => {
    setItemCount(itemCount + 1);
  };

  const handleMinusButton = (index) => {
    console.log(index)
    setItemCount(itemCount - 1);
    let updatedData = JSON.parse(JSON.stringify(billData));
    updatedData.desc_of_goods.splice(index - 1, 1)
    setBillData(updatedData);
  };

  const handleSubmitData = () => {
    let editBillData = JSON.parse(JSON.stringify(billData))
    const buyerId = billData.buyer.id
    editBillData.buyer = buyerId;
    editBillData.buyer_order_date = PayloadDateFormat(billData.buyer_order_date);
    editBillData.invoice_date = PayloadDateFormat(billData.invoice_date);
    editBillData.round_off =
      RoundOffInViewEdit(
        billData?.desc_of_goods,
        billData.output_cgst,
        billData.output_sgst
      ) !== 0
        ? Number(
            RoundOffInViewEdit(
              billData?.desc_of_goods,
              billData.output_cgst,
              billData.output_sgst
            ) || 0
          ).toFixed(2)
        : 0;
        let itemGoodsData = editBillData.desc_of_goods.map(d => {
          return {
            item_id : d?.item_id,
            item_name : d?.item_name,
            description : d?.description,
            hsn_sac : Number(d?.hsn_sac),
            quantity : d?.quantity,
            type : d?.type,
            rate : d?.rate,
            amount : d?.amount,
          }
        })
        editBillData.desc_of_goods = itemGoodsData
    console.log("EDIT",editBillData);

    const editPayloadBillData = JSON.stringify(editBillData);
    submit({ editPayloadBillData: editPayloadBillData }, { method: "post" });
  };

  return (
    <div className="min-w-[1250px] max-w-[95%] h-full mt-8 pb-2">
      <div className="flex font-bold text-xl justify-center items-center w-full mb-6 text-gray-500 dark:text-gray-400">
        Tax Invoice
      </div>
      <div className="overflow-x-auto">
        <div className="border-2 dark:border-whiteColor">
          <div className="flex">
            <div className="flex flex-col border dark:border-whiteColor w-1/2 pl-2 pt-2">
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
                {userDetail.company_name}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {userDetail.address1}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {userDetail.address2}
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
                <span className="w-36 xs:w-fit mt-1">
                  <TextField
                    name="invoice_no"
                    pattern={checkWord}
                    helperText={"Invalid invoice no"}
                    handleFormError={handleError}
                    handleFormValue={handleFormValue}
                    defaultValue={billData?.invoice_no || ""}
                    required={true}
                  />
                </span>
              </div>
              <div className="flex flex-col border dark:border-whiteColor px-2">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Dated
                </span>
                <span className="w-36 xs:w-fit mt-1">
                  <DatePicker
                    name="invoice_date"
                    defaultValue={
                      moment(billData?.invoice_date).format("YYYY-MM-DD") || ""
                    }
                    handleFormValue={handleFormValue}
                    required={true}
                  />
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
              <span className="w-36 xs:w-60">
                <Select
                  name="buyer"
                  defaultValue={billData?.buyer?.id || ""}
                  options={buyer}
                  handleFormValue={handleFormValue}
                  valueKey="id"
                  labelKey="buyer_name"
                  required={true}
                />
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-lg sm:leading-5 mt-2 ml-4">
                {billData?.buyer?.address || ""}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-lg sm:leading-5 ml-4">
                GSTIN/UIN : {billData?.buyer?.gstin_uin || ""}
              </span>
              <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-lg sm:leading-5 ml-4">
                State Name : {billData?.buyer?.state?.state_name || ""}, Code :{" "}
                {billData?.buyer?.state?.state_code || ""}
              </span>
            </div>
            <div className="grid grid-cols-2 w-1/2">
              <div className="flex flex-col border dark:border-whiteColor px-2">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Buyer Order No.
                </span>
                <span className="w-36 xs:w-fit mt-1 mb-2">
                  <TextField
                    name="buyer_order_no"
                    pattern={checkWord}
                    helperText={"Invalid buyer order no"}
                    handleFormError={handleError}
                    handleFormValue={handleFormValue}
                    defaultValue={billData?.buyer_order_no || ""}
                    required={true}
                  />
                </span>
              </div>
              <div className="flex flex-col border dark:border-whiteColor px-2">
                <span className="w-full font-bold text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                  Dated
                </span>
                <span className="w-36 xs:w-fit mt-1 mb-2">
                  <DatePicker
                    name="buyer_order_date"
                    defaultValue={
                      moment(billData?.buyer_order_date).format("YYYY-MM-DD") ||
                      ""
                    }
                    handleFormValue={handleFormValue}
                    required={true}
                  />
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
              {[...Array(itemCount).keys()].map((components, index) => {
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
              {[...Array(itemCount).keys()].map((components, index) => {
                  return (
                    <ItemFields
                      key={index + "itemsGoodsList"}
                      totalCount={itemCount}
                      itemCount={index + 1}
                      billData={billData?.desc_of_goods[index]}
                      itemsGoods={itemsGoods}
                      handleFormValue={handleFormValue}
                      handlePlusButton={handlePlusButton}
                      handleMinusButton={handleMinusButton}
                    />
                  );
                })}
                <div
                  className={`flex flex-col justify-end ${
                    itemCount > 1 ? "mt-14" : "mt-8"
                  }  pr-2 text-gray-500 dark:text-gray-500 font-bold text-sm sm:text-base sm:leading-6 `}
                >
                  <span className="w-full text-end pr-1">
                    Output CGST @{billData.output_cgst}%
                  </span>
                  <span className="w-full text-end pr-1">
                    Output SGST @{billData.output_sgst}%
                  </span>
                  {RoundOffInViewEdit(
                    billData?.desc_of_goods,
                    billData.output_cgst,
                    billData.output_sgst
                  ) !== 0 && (
                    <span
                      className={` w-full flex italic ${
                        RoundOffInViewEdit(
                          billData?.desc_of_goods,
                          billData.output_cgst,
                          billData.output_sgst
                        ) < 0
                          ? "justify-between"
                          : "justify-end"
                      } px-1 `}
                    >
                      {RoundOffInViewEdit(
                        billData?.desc_of_goods,
                        billData.output_cgst,
                        billData.output_sgst
                      ) < 0 && <span className="pl-2">Less :</span>}
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
              {[...Array(itemCount).keys()].map((components, index) => {
                  return (
                    <span
                      key={index + "hsn_sac"}
                      className="flex items-center h-[90px] pb-6 font-semibold justify-center w-full"
                    >
                      {billData?.desc_of_goods[index]?.hsn_sac || ""}
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
              {[...Array(itemCount).keys()].map((components, index) => {
                  return (
                    <div
                      key={index + "quantity"}
                      className="flex justify-center items-center h-[90px] pb-6"
                    >
                      <span className="flex w-32 mx-1">
                        <NumberField
                          name={`quantity_${index + 1}`}
                          handleFormValue={handleFormValue}
                          defaultValue={
                            billData?.desc_of_goods[index] && billData?.desc_of_goods[index]?.quantity !== undefined ? billData?.desc_of_goods[index]?.quantity : ""
                          }
                          required={true}
                        />
                      </span>
                      <span>{billData?.desc_of_goods[0]?.type}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex-none grow-0 h-8 border-r dark:border-whiteColor text-end pr-2 font-extrabold text-sm sm:text-base sm:leading-6">
                {Number(
                  billData?.desc_of_goods.reduce(
                    (acc, curr) => Number(acc) + Number(curr?.quantity || 0),
                    0
                  )
                ).toFixed(0)}
                {"  "}
                {itemCount > 0 &&
                  billData?.desc_of_goods[0]?.type}
              </div>
            </div>
            <div className="flex flex-col h-full w-[10%] min-h-[680px] text-gray-500 dark:text-gray-500">
              <div className="flex-none grow-0 border-r border-b dark:border-whiteColor h-14 text-center">
                Rate
              </div>
              <div className="grow basis-[90%] h-14 border-r border-b dark:border-whiteColor text-end pr-2 font-bold text-sm sm:text-base sm:leading-6">
                {[...Array(itemCount).keys()].map((components, index) => {
                  return (
                    <div
                      key={index + "rate"}
                      className="flex justify-end items-center h-[90px] pb-6"
                    >
                      <span className="flex w-24">
                        <DecimalField
                          name={`rate_${index + 1}`}
                          handleFormValue={handleFormValue}
                          defaultValue={billData?.desc_of_goods[index] && billData?.desc_of_goods[index]?.rate !== undefined ? billData?.desc_of_goods[index].rate : ""}
                          required={true}
                        />
                      </span>
                    </div>
                  );
                })}
                <div
                  className={` flex flex-col justify-end ${
                    itemCount > 1 ? "mt-14" : "mt-8"
                  } pr-1 text-gray-500 dark:text-gray-500 font-bold text-sm sm:text-base sm:leading-6 `}
                >
                  <span className="w-full">{billData.output_cgst}</span>
                  <span className="w-full">{billData.output_sgst}</span>
                </div>
              </div>
              <div className="flex-none grow-0 h-8 border-r dark:border-whiteColor"></div>
            </div>
            <div className="flex flex-col h-full w-[6%] min-h-[680px] text-gray-500 dark:text-gray-500">
              <div className="flex-none grow-0 border-r border-b dark:border-whiteColor h-14 text-center">
                per
              </div>
              <div className="grow basis-[90%] h-14 border-r border-b dark:border-whiteColor text-center  font-bold text-sm sm:text-base sm:leading-6">
              {[...Array(itemCount).keys()].map((components, index) => {
                  return (
                    <div
                      key={index + "type"}
                      className="flex justify-end items-center h-[90px] pb-6"
                    >
                      <span className="flex w-16 mr-2">
                        <TextField
                          name={`type_${index + 1}`}
                          handleFormValue={handleFormValue}
                          defaultValue={
                            billData?.desc_of_goods[index] && billData?.desc_of_goods[index]?.type !== undefined ? billData?.desc_of_goods[index]?.type : "Pcs"
                          }
                          required={true}
                        />
                      </span>
                    </div>
                  );
                })}
                <div
                  className={`flex flex-col justify-start ${
                    itemCount > 1 ? "mt-14" : "mt-8"
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
              {[...Array(itemCount).keys()].map((components, index) => {
                  return (
                    <span
                      key={index + "amount"}
                      className="flex items-center h-[90px] pb-6 font-semibold justify-end w-full"
                    >
                      {billData?.desc_of_goods[index]?.amount || ""}
                    </span>
                  );
                })}
                {itemCount > 1 && (
                  <span className="flex items-center justify-end ml-3 pr-1 font-semibold w-[95%] border-t dark:border-whiteColor">
                    {Number(
                      billData?.desc_of_goods.reduce(
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
                        billData?.desc_of_goods.reduce(
                          (acc, curr) =>
                            Number(acc) + Number(curr?.amount || 0),
                          0
                        )
                      ) * Number((billData.output_cgst || 0) / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="w-full text-end pl-1">
                    {(
                      Number(
                        billData?.desc_of_goods.reduce(
                          (acc, curr) =>
                            Number(acc) + Number(curr?.amount || 0),
                          0
                        )
                      ) * Number((billData.output_sgst || 0) / 100)
                    ).toFixed(2)}
                  </span>
                  <span>
                    {/* {console.log(RoundOffInViewEdit(billData?.desc_of_goods, billData.output_cgst, billData.output_sgst))} */}
                    {RoundOffInViewEdit(
                      billData?.desc_of_goods,
                      billData.output_cgst,
                      billData.output_sgst
                    ) < 0
                      ? `(-)${Math.abs(
                          RoundOffInViewEdit(
                            billData?.desc_of_goods,
                            billData.output_cgst,
                            billData.output_sgst
                          )
                        ).toFixed(2)}`
                      : RoundOffInViewEdit(
                          billData?.desc_of_goods,
                          billData.output_cgst,
                          billData.output_sgst
                        ) > 0
                      ? Number(
                          RoundOffInViewEdit(
                            billData?.desc_of_goods,
                            billData.output_cgst,
                            billData.output_sgst
                          ) || 0
                        ).toFixed(2)
                      : null}
                  </span>
                </div>
              </div>
              <div className="flex-none grow-0 h-8 border-r dark:border-whiteColor text-end pr-2 font-extrabold text-lg sm:text-lg sm:leading-6">
                ₹{" "}
                {TotalAmountWithTaxInTableEdit(
                  billData?.desc_of_goods,
                  "amount",
                  billData.output_cgst,
                  billData.output_sgst
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
                      billData?.desc_of_goods,
                      "amount",
                      billData.output_cgst,
                      billData.output_sgst
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
              {billData?.desc_of_goods[0]?.hsn_sac}
            </div>
            <div className="flex justify-end text-center w-[10%] px-1 border-r dark:border-whiteColor text-gray-500 dark:text-gray-500">
              {
                <span className="pr-1 font-semibold">
                  {Number(
                    billData?.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ).toFixed(2)}
                </span>
              }
            </div>
            <div className="flex text-end w-[20%] border-r dark:border-whiteColor text-gray-500 dark:text-gray-500">
              <span className="w-1/2 font-bold border-r px-1 dark:border-whiteColor text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {billData.output_cgst}%
              </span>
              <span className="w-1/2 font-bold px-1 text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {(
                  Number(
                    billData?.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ) * Number((billData.output_cgst || 0) / 100)
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex text-end w-[20%] border-r dark:border-whiteColor text-gray-500 dark:text-gray-500">
              <span className="w-1/2 font-bold border-r px-1 dark:border-whiteColor text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {billData.output_sgst}%
              </span>
              <span className="w-1/2 font-bold px-1 text-gray-500 dark:text-gray-500 text-xs sm:text-sm sm:leading-6">
                {(
                  Number(
                    billData?.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ) * Number((billData.output_sgst || 0) / 100)
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-end text-center px-1 w-[12%] text-gray-500 dark:text-gray-500">
              {totalTaxWithoutRoundOffViewEdit(
                billData?.desc_of_goods,
                billData.output_cgst,
                billData.output_sgst
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
                    billData?.desc_of_goods.reduce(
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
                    billData?.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ) * Number((billData.output_cgst || 0) / 100)
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex text-end w-[20%] border-r dark:border-whiteColor text-gray-500 dark:text-gray-400">
              <span className="w-1/2 font-bold border-r px-1 dark:border-whiteColor text-xs sm:text-sm sm:leading-6"></span>
              <span className="w-1/2 font-bold px-1 text-xs sm:text-sm sm:leading-6">
                {(
                  Number(
                    billData?.desc_of_goods.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ) * Number((billData.output_sgst || 0) / 100)
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-end text-center px-1 w-[12%] text-gray-500 dark:text-gray-400">
              {totalTaxWithoutRoundOffViewEdit(
                billData?.desc_of_goods,
                billData.output_cgst,
                billData.output_sgst
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
                      billData?.desc_of_goods,
                      billData.output_cgst,
                      billData.output_sgst
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
          <Button
            type="submit"
            icon={<FaCheck />}
            bgColor="bg-green-700"
            hoverColor="bg-green-600"
            outlineColor="outline-green-700"
            handleButtonClick={handleSubmitData}
            text={"UPDATE"}
            // disabled={Object.values(formError).some((value) => value === true)}
          />
          <LinkButton
            path={`${INTERNALROUTES.BILLS}/${billData.id}`}
            text="CANCEL"
            variant="text"
          />
        </div>
      </div>
    </div>
  );
};

export default EditBills;
