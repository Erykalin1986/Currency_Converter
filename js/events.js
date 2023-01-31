import { handleInput, handleSubmit, switchCurrencies } from "./convert.js";
import { fetchCodes, handleTabClick } from "./index.js";
import { handleActionClick } from "./single.js";
import variables from "./variables.js";

const {
  tabs,
  form,
  amountInput,
  switchButton,
  currentCurrency,
  currentCurrencyList,
  singleSelect,
  addButton,
} = variables;

fetchCodes();
amountInput.addEventListener("keyup", handleInput);
form.addEventListener("submit", handleSubmit);
switchButton.addEventListener("click", switchCurrencies);
tabs.forEach((tab) => tab.addEventListener("click", handleTabClick));
currentCurrency.addEventListener("click", handleActionClick);
