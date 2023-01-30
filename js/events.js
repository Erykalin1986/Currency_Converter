import { handleInput, handleSubmit } from "./convert.js";
import { fetchCodes } from "./index.js";
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
