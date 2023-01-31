import state from "./state.js";
import variables from "./variables.js";

const { success, currentCurrency, currentCurrencyList } = variables;

/**
 *
 * @param {*} data
 */
const insertCurrency = (data) => {
  currentCurrencyList.insertAdjacentHTML(
    "afterbegin",
    renderCurrencyItem(data)
  );
};

/**
 *
 */
const insertCurrencies = () => {
  const { currency, currencies } = state;
  const { conversion_rates: rates, base_code: baseCode } = currency;

  currentCurrency.innerHTML = renderCurrencyItem(currency);
  currentCurrencyList.innerHTML = "";

  Object.entries(rates).forEach(([code, rate]) => {
    if (code === baseCode || !currencies.includes(code)) return;
    insertCurrency({ ...currency, code, rate });
  });
};

/**
 *
 * @returns
 */
export const fetchLatest = async () => {
  let myHeaders = new Headers();
  myHeaders.append("apikey", state.apiKey);

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const {
    url,
    currency: { code },
  } = state;

  if (!code) return;

  let date = new Date().toLocaleDateString();
  console.log(date);
//   let year = date.getFullYear();
//   let month = date.getMonth().format(d);
//   let day = date.getDate();
  console.log(`url: `,`https://api.apilayer.com/currency_data/historical?date=${year}-${month}-${day}&currencies=${code}`);

//   try {
//     const response = await fetch(
//       `https://api.apilayer.com/currency_data/historical?date=${year}-${month}-${day}`,
//       requestOptions
//     );
//     const data = await response.json();
//     console.log(`data_historical`, data);

//     if (data.result === success) {
//       state.currency = { ...state.currency, ...data };
//       insertCurrencies();
//     }
//   } catch (err) {
//     console.log(err);
//   }
};

/**
 *
 * @param {*} target
 * @returns
 */
const removeCurrency = (target) => {
  const parent = target.parentElement.parentElement;
  const { item } = parent.dataset;

  if (!item) return;

  const element = document.querySelector(`[data-item="${item}"]`);
  element.remove();
};

/**
 *
 */
const changeCurrency = () => {
  currentCurrency.parentElement.classList.add("active");
};

/**
 *
 * @param {*} param0
 * @returns
 */
export const handleActionClick = ({ target }) => {
  const { action } = target.dataset;
  console.log(`target`, target);
  console.log(`action`, action);

  if (!action) return;

  const {
    actions: { remove },
  } = state;

  action === remove ? removeCurrency(target) : changeCurrency();
};
