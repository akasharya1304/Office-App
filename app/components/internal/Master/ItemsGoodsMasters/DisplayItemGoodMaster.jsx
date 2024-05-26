import { LinkButton } from "~/components/comman/Button";
import { Switch } from "~/components/comman/InputField";
import { MdOutlineEdit } from "react-icons/md";
import INTERNALROUTES from "~/constant/InternalRoutes";

const DisplayItemGoodMaster = ({ itemsGoods }) => {
  return (
    itemsGoods && (
      <div className="w-full md:w-2/5 h-fit mt-8">
        <div className="flex justify-between items-baseline w-full h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            ITEM NAME*
          </span>
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
            {itemsGoods.item_name}
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            HSN / SAC*
          </span>
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
            {itemsGoods.hsn_sac}
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            CGST*
          </span>
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
            {itemsGoods.cgst} %
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full my-2 h-14">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            SGST*
          </span>
          <span className="w-fit font-bold text-gray-500 dark:text-gray-500 text-sm sm:text-lg sm:leading-6">
            {itemsGoods.sgst} %
          </span>
        </div>
        <div className="flex justify-between items-baseline w-full mt-3">
          <span className="text-gray-900 dark:text-gray-300 font-bold tracking-normal">
            ACTIVE
          </span>
          <span className="w-fit">
            <Switch
              name="is_active"
              defaultValue={itemsGoods.is_active}
              disabled={true}
            />
          </span>
        </div>
        <div className="flex space-x-4 justify-start items-center w-fit mt-8">
          <LinkButton
            path={`${INTERNALROUTES.MASTER_ITEMS_GOODS_MASTERS}/${itemsGoods.id}/edit`}
            icon={<MdOutlineEdit />}
            text="EDIT"
          />
          <LinkButton
            path={INTERNALROUTES.MASTER_ITEMS_GOODS_MASTERS}
            text="CANCEL"
            variant="text"
          />
        </div>
      </div>
    )
  );
};

export default DisplayItemGoodMaster;
