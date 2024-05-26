import { Link } from "@remix-run/react";
import moment from "moment";
import Chip from "~/components/comman/Chip";

const MasterTable = ({ tableHeaders, tableData, path }) => {
  return (
    <div className="p-2 overflow-auto relative">
      <table
        className={`table-fixed w-full border-2  rounded-xl border-gray-300 dark:border-gray-500 `}
      >
        <thead className="bg-neutral-100 dark:bg-slate-900">
          <tr className="border-b-2 text-gray-400 dark:border-gray-500  dark:text-gray-200">
            {tableHeaders
              ? tableHeaders.map((h, i) => (
                  <th
                    key={h.key}
                    className={`w-[240px] ${i === 0 ? 'text-start' : 'text-end'} tracking-wider font-semibold text-start p-3`}
                  >
                    {h.head}
                  </th>
                ))
              : null}
          </tr>
        </thead>
        <tbody className="h-full">
          {tableData && tableData.length > 0 ? (
            tableData.map((d, i) => (
              <tr
                key={d.id}
                className="border-y-2 dark:border-gray-500 dark:text-slate-400"
              >
                {tableHeaders &&
                  tableHeaders.map((h, i) => (
                    <td key={d.id + +i} className="text-start text-sm w-full align-top">
                      <Link
                        to={`${path}/${d.id}`}
                        className={`w-full block p-3 ${i === 0 ? 'text-start' : 'text-end'}`}
                      >
                        {!Boolean(d.is_active) && i === 0 ? (
                          <span className={`flex items-center gap-2`}>
                            <span>{d[h.key]}</span>
                            <span className="scale-[0.7]">
                              <Chip text="inactive" bgColor={"bg-red-500"} />
                            </span>
                          </span>
                        ) : (
                          h.key === 'modified_at'
                          ? moment(d[h.key]).format('DD MMM YYYY')
                          : ['cgst', 'sgst'].includes(h.key)
                          ? d[h.key] + " %"
                          : d[h.key]
                        )}
                      </Link>
                    </td>
                  ))}
              </tr>
            ))
          ) : (
            <div
              className={`flex relative left-[30vw] justify-center w-full items-center h-20 dark:text-slate-300`}
            >
              No Data Found
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MasterTable;
