import { checkInvalidValue } from "~/constant/method";

const RoundOff = (formItemValue) => {
  if (formItemValue && formItemValue.length > 0) {
    let roundOffValue = Number(
      (
        Math.round(
          Number(
            Number(
              (
                Number(
                  formItemValue.reduce(
                    (acc, curr) =>
                      Number(acc) + Number(curr?.total_amount || 0),
                    0
                  )
                ) *
                Number(
                  (formItemValue.find((d) => d.item_name === `item_1`)?.item
                    ?.cgst || 0) / 100
                )
              ).toFixed(2)
            ) +
              Number(
                (
                  Number(
                    formItemValue.reduce(
                      (acc, curr) =>
                        Number(acc) + Number(curr?.total_amount || 0),
                      0
                    )
                  ) *
                  Number(
                    (formItemValue.find((d) => d.item_name === `item_1`)?.item
                      ?.sgst || 0) / 100
                  )
                ).toFixed(2)
              )
          )
        ) -
        Number(
          Number(
            (
              Number(
                formItemValue.reduce(
                  (acc, curr) => Number(acc) + Number(curr?.total_amount || 0),
                  0
                )
              ) *
              Number(
                (formItemValue.find((d) => d.item_name === `item_1`)?.item
                  ?.cgst || 0) / 100
              )
            ).toFixed(2)
          ) +
            Number(
              (
                Number(
                  formItemValue.reduce(
                    (acc, curr) =>
                      Number(acc) + Number(curr?.total_amount || 0),
                    0
                  )
                ) *
                Number(
                  (formItemValue.find((d) => d.item_name === `item_1`)?.item
                    ?.sgst || 0) / 100
                )
              ).toFixed(2)
            )
        )
      ).toFixed(2)
    );
    console.log(formItemValue, roundOffValue);
    return roundOffValue;
  }
};

const totaltaxWithoutRoundOff = (formItemValue) => {
  return (
    Number(
      (
        Number(
          formItemValue.reduce(
            (acc, curr) => Number(acc) + Number(curr?.total_amount || 0),
            0
          )
        ) *
        Number(
          (formItemValue.find((d) => d.item_name === `item_1`)?.item?.cgst ||
            0) / 100
        )
      ).toFixed(2)
    ) +
    Number(
      (
        Number(
          formItemValue.reduce(
            (acc, curr) => Number(acc) + Number(curr?.total_amount || 0),
            0
          )
        ) *
        Number(
          (formItemValue.find((d) => d.item_name === `item_1`)?.item?.sgst ||
            0) / 100
        )
      ).toFixed(2)
    )
  ).toFixed(2);
};

const TotalAmountWithTax = (formItemValue) => {
  if (formItemValue && formItemValue.length > 0) {
    return Math.round(
      Number(
        Number(
          formItemValue.reduce(
            (acc, curr) => Number(acc) + Number(curr?.total_amount || 0),
            0
          )
        ).toFixed(2)
      ) *
        Number(
          Number(
            Number(100) +
              Number(
                formItemValue.find((d) => d.item_name === `item_1`)?.item?.cgst
              ) +
              Number(
                formItemValue.find((d) => d.item_name === `item_1`)?.item?.sgst
              )
          ) / 100
        ).toFixed(2)
    ).toFixed(2);
  }
};

const totalTaxWithoutRoundOffViewEdit = (data, cgst, sgst) => {
  return (
    Number(
      (
        Number(
          data.reduce((acc, curr) => Number(acc) + Number(curr?.amount || 0), 0)
        ) * Number((cgst || 0) / 100)
      ).toFixed(2)
    ) +
    Number(
      (
        Number(
          data.reduce((acc, curr) => Number(acc) + Number(curr?.amount || 0), 0)
        ) * Number((sgst || 0) / 100)
      ).toFixed(2)
    )
  ).toFixed(2);
};

const RoundOffInViewEdit = (data, cgst, sgst) => {
  if (data && data.length > 0) {
    let roundOffValue = Number(
      (
        Math.round(
          Number(
            Number(
              (
                Number(
                  data.reduce(
                    (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                    0
                  )
                ) * Number(cgst / 100)
              ).toFixed(2)
            ) +
              Number(
                (
                  Number(
                    data.reduce(
                      (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                      0
                    )
                  ) * Number(sgst / 100)
                ).toFixed(2)
              )
          )
        ) -
        Number(
          Number(
            (
              Number(
                data.reduce(
                  (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                  0
                )
              ) * Number(cgst / 100)
            ).toFixed(2)
          ) +
            Number(
              (
                Number(
                  data.reduce(
                    (acc, curr) => Number(acc) + Number(curr?.amount || 0),
                    0
                  )
                ) * Number(sgst / 100)
              ).toFixed(2)
            )
        )
      ).toFixed(2)
    );
    return roundOffValue;
  }
};

const TotalAmountWithTaxInTableEdit = (data, key, cgst, sgst) => {
  if (data && data.length > 0) {
    return Math.round(
      Number(
        Number(
          data.reduce(
            (acc, curr) =>
              Number(acc) +
              Number((!checkInvalidValue(curr[key]) ? curr[key] : 0) || 0),
            0
          )
        ).toFixed(2)
      ) *
        Number(Number(Number(100) + Number(cgst) + Number(sgst)) / 100).toFixed(
          2
        )
    ).toFixed(2);
  }
};

export {
  RoundOff,
  totaltaxWithoutRoundOff,
  TotalAmountWithTax,
  totalTaxWithoutRoundOffViewEdit,
  RoundOffInViewEdit,
  TotalAmountWithTaxInTableEdit,
};
