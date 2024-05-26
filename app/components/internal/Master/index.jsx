import MasterCard from "./MasterCard";
import { FaUserShield } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaSitemap } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import INTERNALROUTES from "~/constant/InternalRoutes";

function MasterIndex() {
  return (
    <>
      <div className="my-10">
        <h2 className="text-2xl font-medium leading-6 text-gray-700 dark:text-gray-200">
          User Configuration
        </h2>
      </div>
      <div className="flex flex-wrap gap-8">
      <MasterCard
        path={INTERNALROUTES.MASTER_USER_DETAIL}
        icon={<FaUserShield />}
        title="User Detail"
        descrption="Manage user detail"
      />
      </div>
      <hr className="my-8" />
      <div className="my-10">
        <h2 className="text-2xl font-medium leading-6 text-gray-700 dark:text-gray-200">
          Master Data Configuration
        </h2>
      </div>
      <div className="flex flex-wrap gap-8">
        <MasterCard
          path={INTERNALROUTES.MASTER_BUYER_MASTERS}
          icon={<FaUsers />}
          title="Buyer Master"
          descrption="Manage buyer detail"
        />
        <MasterCard
          path={INTERNALROUTES.MASTER_ITEMS_GOODS_MASTERS}
          icon={<FaSitemap />}
          title="Items Goods Master"
          descrption="Manage items & goods detail"
        />
        <MasterCard
          path={INTERNALROUTES.MASTER_STATE_MASTERS}
          icon={<IoLocationSharp />}
          title="State Master"
          descrption="Manage state detail"
        />
      </div>
    </>
  );
}

export default MasterIndex;
