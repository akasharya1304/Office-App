import { LinkButton } from "~/components/comman/Button";
import { Switch } from "~/components/comman/InputField";
import { MdOutlineEdit } from "react-icons/md";
import INTERNALROUTES from "~/constant/InternalRoutes";

const DisplayBuyerMaster = ({ buyerData }) => {
  return (
    buyerData && (
      <div className="w-full md:w-3/4 xl:w-1/2 2xl:w-2/5 h-fit mt-8">
        <div className="flex justify-between items-baseline w-full min-h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            BUYER NAME*
          </span>
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
            {buyerData.buyer_name}
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 min-h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            ADDRESS*
          </span>
          <span className="w-1/2 mb-3 text-end font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
            {buyerData.address}
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 min-h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            GSTIN / UIN*
          </span>
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
            {buyerData.gstin_uin}
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 min-h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            STATE NAME*
          </span>
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
            {buyerData.state.state_name}
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 min-h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            STATE CODE*
          </span>
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
            {buyerData.state.state_code}
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full mt-3">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            ACTIVE
          </span>
          <span className="w-fit">
            <Switch
              name="is_active"
              defaultValue={buyerData.is_active}
              disabled={true}
            />
          </span>
        </div>
        <div className="flex space-x-4 justify-start items-center w-fit mt-8">
          <LinkButton
            path={`${INTERNALROUTES.MASTER_BUYER_MASTERS}/${buyerData.id}/edit`}
            icon={<MdOutlineEdit />}
            text="EDIT"
          />
          <LinkButton
            path={INTERNALROUTES.MASTER_BUYER_MASTERS}
            text="CANCEL"
            variant="text"
          />
        </div>
      </div>
    )
  );
};

export default DisplayBuyerMaster;
