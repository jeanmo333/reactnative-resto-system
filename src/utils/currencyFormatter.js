/** @format */

import "intl";
import "intl/locale-data/jsonp/es"; // or any other locale you need

const currencyFormatter = (cantidad) => {
  return cantidad.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
};

export default currencyFormatter;
