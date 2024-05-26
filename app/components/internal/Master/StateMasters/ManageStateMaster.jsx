import { Form } from "@remix-run/react";
import { Button, LinkButton } from "~/components/comman/Button";
import { Switch, TextField } from "~/components/comman/InputField";
import { checkAlphabet, checkNumeric } from "~/constant/method";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import INTERNALROUTES from "~/constant/InternalRoutes";

const ManageStateMaster = ({ defaultStateData }) => {
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
            STATE NAME*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="state_name"
              pattern={checkAlphabet}
              helperText={"Invalid state name"}
              handleFormError={handleError}
              defaultValue={defaultStateData?.state_name || ""}
              required={true}
            />
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            STATE CODE*
          </span>
          <span className="w-36 xs:w-fit">
            <TextField
              name="state_code"
              pattern={checkNumeric}
              handleFormError={handleError}
              maxLength={2}
              minLength={2}
              defaultValue={defaultStateData?.state_code || ""}
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
                defaultStateData?.is_active === undefined
                  ? true
                  : defaultStateData?.is_active
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
            text={defaultStateData?.is_active === undefined ? "SAVE" : "UPDATE"}
            disabled={Object.values(formError).some((value) => value === true)}
          />
          <LinkButton
            path={
              defaultStateData?.is_active === undefined
                ? INTERNALROUTES.MASTER_STATE_MASTERS
                : `${INTERNALROUTES.MASTER_STATE_MASTERS}/${defaultStateData.id}`
            }
            text="CANCEL"
            variant="text"
          />
        </div>
      </Form>
    </div>
  );
};

export default ManageStateMaster;
