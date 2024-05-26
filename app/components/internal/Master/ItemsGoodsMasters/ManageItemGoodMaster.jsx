import { Form } from "@remix-run/react";
import { Button, LinkButton } from "~/components/comman/Button";
import {
  DecimalField,
  Switch,
  TextField,
} from "~/components/comman/InputField";
import { checkAlphabet, checkNumeric } from "~/constant/method";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import INTERNALROUTES from "~/constant/InternalRoutes";

const ManageItemGoodMaster = ({ defaultItemGoodData }) => {
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
            ITEM NAME*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="item_name"
              pattern={checkAlphabet}
              helperText={"Invalid item name"}
              handleFormError={handleError}
              defaultValue={defaultItemGoodData?.item_name || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            HSN / SAC*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="hsn_sac"
              pattern={checkNumeric}
              handleFormError={handleError}
              defaultValue={defaultItemGoodData?.hsn_sac || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            CGST*
          </span>
          <span className="w-36 xs:w-fit">
            <DecimalField
              name="cgst"
              defaultValue={defaultItemGoodData?.cgst || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            SGST*
          </span>
          <span className="w-36 xs:w-fit">
            <DecimalField
              name="sgst"
              defaultValue={defaultItemGoodData?.sgst || ""}
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
                defaultItemGoodData?.is_active === undefined
                  ? true
                  : defaultItemGoodData?.is_active
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
            text={defaultItemGoodData?.is_active === undefined ? "SAVE" : "UPDATE"}
            disabled={Object.values(formError).some((value) => value === true)}
          />
          <LinkButton
            path={
              defaultItemGoodData?.is_active === undefined
                ? INTERNALROUTES.MASTER_ITEMS_GOODS_MASTERS
                : `${INTERNALROUTES.MASTER_ITEMS_GOODS_MASTERS}/${defaultItemGoodData.id}`
            }
            text="CANCEL"
            variant="text"
          />
        </div>
      </Form>
    </div>
  );
};

export default ManageItemGoodMaster;
