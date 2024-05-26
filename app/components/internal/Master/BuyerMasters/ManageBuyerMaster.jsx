import { Form } from "@remix-run/react";
import { Button, LinkButton } from "~/components/comman/Button";
import {
  Select,
  Switch,
  TextArea,
  TextField,
} from "~/components/comman/InputField";
import { checkAlphabet, checkGstin } from "~/constant/method";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import INTERNALROUTES from "~/constant/InternalRoutes";

const ManageBuyerMaster = ({ defaultBuyerData, stateList }) => {
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
    <div className="w-full lg:w-1/2 h-fit mt-8">
      <Form method="post">
        <div className="flex justify-between items-baseline w-full h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            BUYER NAME*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="buyer_name"
              pattern={checkAlphabet}
              helperText={"Invalid item name"}
              handleFormError={handleError}
              defaultValue={defaultBuyerData?.buyer_name || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-flex-start w-full my-2 h-fit">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            ADDRESS*
          </span>
          <span className="w-36 xs:w-1/2">
            <TextArea 
              name='address'
              defaultValue={defaultBuyerData?.address || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            STATE NAME*
          </span>
          <span className="w-36 xs:w-60">
            <Select 
              name='state'
              defaultValue={defaultBuyerData?.state?.id || ""}
              options={stateList}
              valueKey='id'
              labelKey='state_name'
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
              defaultValue={defaultBuyerData?.gstin_uin || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full mt-3">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            ACTIVE
          </span>
          <span className="w-36 xs:w-fit">
            <Switch
              name="is_active"
              defaultValue={Boolean(
                defaultBuyerData?.is_active === undefined
                  ? true
                  : defaultBuyerData?.is_active
              )}
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
            text={defaultBuyerData?.is_active === undefined ? "SAVE" : "UPDATE"}
            disabled={Object.values(formError).some((value) => value === true)}
          />
          <LinkButton
            path={
              defaultBuyerData?.is_active === undefined
                ? INTERNALROUTES.MASTER_BUYER_MASTERS
                : `${INTERNALROUTES.MASTER_BUYER_MASTERS}/${defaultBuyerData.id}`
            }
            text="CANCEL"
            variant="text"
          />
        </div>
      </Form>
    </div>
  );
};

export default ManageBuyerMaster;
