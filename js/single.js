import { renderCurrencyItem } from "./markups.js";
import state from "./state.js";
import variables from "./variables.js";

const { success, currentCurrency, currentCurrencyList } = variables;

/**
 *
 * @param {*} data
 */
const insertCurrency = (data) => {
  currentCurrencyList.insertAdjacentHTML(
    'afterbegin',
    renderCurrencyItem(data)
  );
};

/**
 *
 */
const insertCurrencies = () => {
  const { currency, currencies } = state;
  const { quotes: rates, source: baseCode } = currency;

  currentCurrency.innerHTML = renderCurrencyItem(currency);
  currentCurrencyList.innerHTML = '';

  Object.entries(rates).forEach(([quotes, rate]) => {
    let code = quotes.replace(currency.code, "");
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
  myHeaders.append('apikey', state.apiKey);

  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  const {
    url,
    currency: { code },
  } = state;

  if (!code) return;

  let date = new Date().toISOString().slice(0, 10);

  try {
    const response = await fetch(
      `${url}/historical?date=${date}&source=${code}`,
      requestOptions
    );
    const data = await response.json();
    
    if (data.success) {
      state.currency = { ...state.currency, ...data };
      insertCurrencies();
    }
  } catch (err) {
    console.log(err);
  }
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
  currentCurrency.parentElement.classList.add('active');
};

/**
 *
 * @param {*} param0
 * @returns
 */
export const handleActionClick = ({ target }) => {
  const { action } = target.dataset;

  if (!action) return;

  const {
    actions: { remove },
  } = state;

  action === remove ? removeCurrency(target) : changeCurrency();
};

export const handleSingleSelectChange = ({ target }) => {
  target.parentElement.classList.remove('active');
  state.currency = {
    ...state.currency,
    code: target.value,
    source: target.value,
  };
  fetchLatest();
  target.value = "";
};

export const addCurrency = ({ currentTarget }) => {
  currentTarget.parentElement.classList.add('active');
};

export const handleAddSelectChange = ({ target }) => {
  const { currency: { quotes: rate, source: baseCode }} = state;

  const currency = Object.entries(rate).find(([key]) => key.includes(target.value));

  console.log(`currency: `,currency);

  if (currency) {
    const [code, amount] = currency;
    console.log(`state.currency: `,state.currency);
    console.log(`code: `,code);
    console.log(`amount: `,amount);
    insertCurrency(state.currency, code, { rate: amount });
  }

  target.parentElement.classList.remove('active');
  target.value = '';
};