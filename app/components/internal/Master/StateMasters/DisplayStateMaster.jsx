import { LinkButton } from "~/components/comman/Button";
import { Switch } from "~/components/comman/InputField";
import { MdOutlineEdit } from "react-icons/md";
import INTERNALROUTES from "~/constant/InternalRoutes";

const DisplayStateMaster = ({stateData}) => {
  return (
    stateData && 
    <div className="w-full md:w-2/5 h-fit mt-8">
        <div className="flex justify-between items-baseline w-full h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            STATE NAME*
          </span>
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
            {stateData.state_name}
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            STATE CODE*
          </span>
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
          {stateData.state_code}
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full mt-3">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            ACTIVE
          </span>
          <span className="w-fit">
            <Switch name="is_active" defaultValue={stateData.is_active} disabled={true} />
          </span>
        </div>
        <div className="flex space-x-4 justify-start items-center w-fit mt-8">
          <LinkButton
            path={`${INTERNALROUTES.MASTER_STATE_MASTERS}/${stateData.id}/edit`}
            icon={<MdOutlineEdit />}
            text="EDIT"
          />
          <LinkButton
            path={INTERNALROUTES.MASTER_STATE_MASTERS}
            text="CANCEL"
            variant="text"
          />
        </div>
    </div>
  );
};

export default DisplayStateMaster;
