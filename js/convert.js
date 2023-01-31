import { renderResult } from "./markups.js";
import state from "./state.js";
import { convertTime, formatToCurrency, getFullTitle } from "./utils.js";
import variables from "./variables.js";

const {
  success,
  formResults,
  rateConversion,
  rateLast,
  toSelect,
  fromSelect,
  resultFrom,
  resultTo,
} = variables;

export const handleChange = ({ target: { value, name } }) => {
  state.pair = {
    ...state.pair,
    [name]: value,
  };
};

export const handleInput = ({ target: { value, name } }) => {
  state[name] = Number(value);
};

const insertResults = ({
  info: { quote, timestamp },
  query: { from, to, amount },
  result,
}) => {
  const resFrom = {
    code: from,
    amount: state.amount,
    full: getFullTitle(state.codes, from),
  };

  const resTo = {
    code: to,
    amount: result,
    full: getFullTitle(state.codes, to),
  };

  resultFrom.innerHTML = renderResult(resFrom);
  resultTo.innerHTML = renderResult(resTo);

  const baseValue = formatToCurrency(from, 1);
  const targetValue = formatToCurrency(to, quote);

  rateConversion.innerText = `${baseValue} = ${targetValue}`;
  rateLast.innerText = `Последнее обновление: ${convertTime(timestamp)}`;

  formResults.classList.add("show");
};

/**
 * Выполняет запрос на выполнение конвертации выбранных валют.
 * @param {*} e Событие
 * @returns 
 */
export const handleSubmit = async (e) => {
  console.log(`event: `,e);
  e?.preventDefault();

  const {
    url,
    amount,
    pair: { from, to },
  } = state;

  state.isLoading = true;

  if (!amount || !from || !to) return;

  try {
    let myHeaders = new Headers();
    myHeaders.append("apikey", state.apiKey);

    let requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    const response = await fetch(
      `${url}/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions
    );
    const data = await response.json();

    if (data.success) insertResults(data);

    state.isLoading = false;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Переключает выбранные валюты в меню выбора.
 */
export const switchCurrencies = () => {
  const {
    pair: { to, from },
  } = state;

  if (!to || !from) return;

  state.pair = {
    to: from,
    from: to,
  };

  toSelect.value = from;
  fromSelect.value = to;
};
