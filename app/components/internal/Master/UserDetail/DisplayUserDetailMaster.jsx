import { LinkButton } from "~/components/comman/Button";
import { MdOutlineEdit } from "react-icons/md";
import INTERNALROUTES from "~/constant/InternalRoutes";

const DisplayUserDetailMaster = ({ userDetailData }) => {
  return (
    <div className="w-full md:w-3/5 h-fit mt-8 pb-20">
      <div className="flex justify-between items-baseline w-full h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          COMPANY NAME*
        </span>
        <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
          {userDetailData?.company_name || ""}
        </span>
      </div>
      <div className="flex justify-between items-baseline w-full my-2 h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          COMPANY ADDRESS*
        </span>
        <div className="flex flex-wrap justify-end">
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
            {userDetailData?.address_1 || ""}
          </span>
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
            {userDetailData?.address_2 || ""}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-baseline w-full my-2 h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          CONTACT NO.*
        </span>
        <div className="flex flex-wrap justify-end">
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
            {userDetailData?.contact_no_1 || ""} ,
          </span>
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
            {userDetailData?.contact_no_2 || ""}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-baseline w-full my-2 h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          GSTIN / UIN*
        </span>
        <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
          {userDetailData?.gstin_uin || ""}
        </span>
      </div>
      <div className="flex justify-between items-baseline w-full my-2 h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          STATE NAME*
        </span>
        <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
          {userDetailData?.state?.state_name || ""}
        </span>
      </div>
      <div className="flex justify-between items-baseline w-full my-2 h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          STATE CODE*
        </span>
        <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
          {userDetailData?.state?.state_code || ""}
        </span>
      </div>
      <div className="flex justify-between items-baseline w-full my-2 h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          PHONE NO.*
        </span>
        <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
          {userDetailData?.phone_no || ""}
        </span>
      </div>
      <div className="flex justify-between items-baseline w-full my-2 h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          EMAIL ID*
        </span>
        <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
          {userDetailData?.email || ""}
        </span>
      </div>
      <div className="flex justify-between items-baseline w-full my-2 h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          BANK NAME*
        </span>
        <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
          {userDetailData?.bank_name || ""}
        </span>
      </div>
      <div className="flex justify-between items-baseline w-full my-2 h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          BANK ACCOUNT NO.*
        </span>
        <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
          {userDetailData?.bank_account_no || ""}
        </span>
      </div>
      <div className="flex justify-between items-baseline w-full my-2 h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          BRANCH*
        </span>
        <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
          {userDetailData?.branch || ""}
        </span>
      </div>
      <div className="flex justify-between items-baseline w-full my-2 h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          IFS CODE*
        </span>
        <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
          {userDetailData?.ifsc || ""}
        </span>
      </div>
      <div className="flex justify-between items-baseline w-full my-2 h-14">
        <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
          PAN NO.*
        </span>
        <span className="w-fit font-bold text-gray-500 dark:text-gray-500 break-all text-sm sm:text-lg sm:leading-6">
          {userDetailData?.pan_no || ""}
        </span>
      </div>
      <div className="flex space-x-4 justify-start items-center w-fit mt-8">
        <LinkButton
          path={`${INTERNALROUTES.MASTER_USER_DETAIL}/edit`}
          icon={<MdOutlineEdit />}
          text="EDIT"
        />
        <LinkButton
          path={INTERNALROUTES.MASTER}
          text="CANCEL"
          variant="text"
        />
      </div>
    </div>
  );
};

export default DisplayUserDetailMaster;
