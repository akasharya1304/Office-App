import { Link } from "@remix-run/react";
import moment from "moment";
import Chip from "~/components/comman/Chip";
import { DateFormat, checkInvalidValue } from "~/constant/method";
import { TotalAmountWithTaxInTableEdit } from "./HandleCalculation";

const Table = ({ tableHeaders, tableData, path }) => {
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
                    className={`w-[200px] ${
                      i === 0 ? "text-start" : "text-end"
                    } tracking-wider font-semibold text-start p-3`}
                  >
                    {h.head}
                  </th>
                ))
              : null}
          </tr>
        </thead>
        <tbody className="h-full text-gray-900">
          {tableData && tableData.length > 0 ? (
            tableData.map((d, i) => (
              <tr
                key={d.id + i}
                className="border-y-2 text-gray-900 dark:border-gray-500 dark:text-slate-400"
              >
                {tableHeaders &&
                  tableHeaders.map((h, i) => (
                    <td
                      key={d.id + (h?.key || h?.key1)}
                      className="text-start text-sm w-full align-top"
                    >
                      <Link
                        to={`${path}/${d.id}`}
                        className={`w-full block p-3 ${
                          i === 0 ? "text-start" : "text-end"
                        }`}
                      >
                        {h.key === "modified_at" ? (
                          <span className="italic">
                            {moment(d[h.key]).format("DD MMM YYYY")}
                          </span>
                        ) : !checkInvalidValue(h?.key2) ? (
                          <div className="flex flex-col">
                            <span className="text-lg font-bold text-gray-400">
                              {d[h.key]}
                            </span>
                            <span className="italic">
                              {["invoice_date", "buyer_order_date"].includes(
                                h.key2
                              )
                                ? DateFormat(d[h.key2])
                                : d[h.key2]}
                            </span>
                          </div>
                        ) : h.key === "buyer.buyer_name" ? (
                          <span className="text-lg font-bold text-gray-400">
                            {d["buyer"]["buyer_name"]}
                          </span>
                        ) : h.key === "total_amount" ? (
                          <div className="flex flex-col">
                            <span className="text-lg font-bold text-gray-400">
                              ₹{" "}
                              {console.log(
                                "T",
                                TotalAmountWithTaxInTableEdit(
                                  d.desc_of_goods,
                                  "amount",
                                  d.output_cgst,
                                  d.output_sgst
                                ),
                                d.desc_of_goods,
                                "amount",
                                d.output_cgst,
                                d.output_sgst
                              )}
                              {TotalAmountWithTaxInTableEdit(
                                d.desc_of_goods,
                                "amount",
                                d.output_cgst,
                                d.output_sgst
                              )}
                            </span>
                          </div>
                        ) : (
                          d[h.key]
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

export default Table;
