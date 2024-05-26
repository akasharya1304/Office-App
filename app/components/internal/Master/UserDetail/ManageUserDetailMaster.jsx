import { Form } from "@remix-run/react";
import { Button, LinkButton } from "~/components/comman/Button";
import { EmailField, Select, TextField } from "~/components/comman/InputField";
import {
  checkWord,
  checkAlphabet,
  checkContactNo,
  checkEmail,
  checkGstin,
  checkIFSC,
  checkNumeric,
  checkPanNo,
  checkPhoneNo,
} from "~/constant/method";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import INTERNALROUTES from "~/constant/InternalRoutes";

const ManageUserDetailMaster = ({ defaultUserDetailData, stateList }) => {
  const [formError, setFormError] = useState({});

  useEffect(() => {
    console.log(formError);
  }, [formError]);

  const handleError = (label, data) => {
    setFormError((preValue) => {
      return {
        ...preValue,
        [label]: data,
      };
    });
  };
  return (
    <div className="w-full lg:w-1/2 h-fit mt-8 pb-20">
      <Form method="post">
        <div className="flex justify-between items-baseline w-full h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            COMPANY NAME*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="company_name"
              pattern={checkAlphabet}
              helperText={"Invalid company name"}
              handleFormError={handleError}
              defaultValue={defaultUserDetailData?.company_name || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full h-fit">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            ADDRESS*
          </span>
          <div className="flex flex-wrap justify-end">
            <span className="w-36 xs:w-fit my-3">
              <TextField
                name="address_1"
                pattern={checkWord}
                helperText={"Invalid address"}
                handleFormError={handleError}
                defaultValue={defaultUserDetailData?.address_1 || ""}
                required={true}
              />
            </span>
            <span className="w-36 xs:w-fit my-3 ml-2">
              <TextField
                name="address_2"
                pattern={checkWord}
                helperText={"Invalid address"}
                handleFormError={handleError}
                defaultValue={defaultUserDetailData?.address_2 || ""}
                required={true}
              />
            </span>
          </div>
        </div>
        <div className="flex justify-between items-baseline w-full h-fit">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            CONTACT NO.*
          </span>
          <div className="flex flex-wrap justify-end">
            <span className="w-36 xs:w-fit my-3">
              <TextField
                name="contact_no_1"
                pattern={checkContactNo}
                maxLength={10}
                minLength={10}
                helperText={"Invalid contact no"}
                handleFormError={handleError}
                defaultValue={defaultUserDetailData?.contact_no_1 || ""}
                required={true}
              />
            </span>
            <span className="w-36 xs:w-fit my-3 ml-2">
              <TextField
                name="contact_no_2"
                pattern={checkContactNo}
                maxLength={10}
                minLength={10}
                helperText={"Invalid contact no"}
                handleFormError={handleError}
                defaultValue={defaultUserDetailData?.contact_no_2 || ""}
                required={true}
              />
            </span>
          </div>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            STATE NAME*
          </span>
          <span className="w-36 xs:w-60">
            <Select
              name="state"
              defaultValue={defaultUserDetailData?.state?.id || ""}
              options={stateList}
              valueKey="id"
              labelKey="state_name"
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            GSTIN / UIN*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="gstin_uin"
              pattern={checkGstin}
              helperText={"Invalid GSTIN / UIN No."}
              handleFormError={handleError}
              defaultValue={defaultUserDetailData?.gstin_uin || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            COMPANY PHONE NO.*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="phone_no"
              pattern={checkPhoneNo}
              helperText={"Invalid phone no"}
              handleFormError={handleError}
              defaultValue={defaultUserDetailData?.phone_no || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            EMAIL ID*
          </span>
          <span className="w-36 xs:w-fit">
            <EmailField
              name="email"
              pattern={checkEmail}
              helperText={"Invalid email"}
              handleFormError={handleError}
              defaultValue={defaultUserDetailData?.email || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            BANK NAME*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="bank_name"
              pattern={checkAlphabet}
              helperText={"Invalid bank name"}
              handleFormError={handleError}
              defaultValue={defaultUserDetailData?.bank_name || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            BANK ACCOUNT NO.*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="bank_account_no"
              pattern={checkNumeric}
              helperText={"Invalid bank account no."}
              handleFormError={handleError}
              defaultValue={defaultUserDetailData?.bank_account_no || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            BRANCH*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="branch"
              pattern={checkWord}
              helperText={"Invalid branch"}
              handleFormError={handleError}
              defaultValue={defaultUserDetailData?.branch || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            IFS CODE*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="ifsc"
              pattern={checkIFSC}
              helperText={"Invalid ifsc"}
              handleFormError={handleError}
              defaultValue={defaultUserDetailData?.ifsc || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            PAN NO.*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="pan_no"
              pattern={checkPanNo}
              helperText={"Invalid pan no."}
              handleFormError={handleError}
              defaultValue={defaultUserDetailData?.pan_no || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex space-x-4 justify-start items-center w-fit mt-8">
          <Button
            type="submit"
            icon={<FaCheck />}
            bgColor="bg-green-700"
            hoverColor="bg-green-600"
            outlineColor="outline-green-700"
            text={defaultUserDetailData?.id === undefined ? "SAVE" : "UPDATE"}
            disabled={Object.values(formError).some((value) => value === true)}
          />
          <LinkButton
            path={INTERNALROUTES.MASTER_USER_DETAIL}
            text="CANCEL"
            variant="text"
          />
        </div>
      </Form>
    </div>
  );
};

export default ManageUserDetailMaster;
