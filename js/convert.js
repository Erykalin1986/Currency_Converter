import state from "./state.js";
import variables from "./variables.js";

const { success, formResults, rateConversion, rateLast, toSelect, fromSelect } =
  variables;

export const handleChange = ({ target: { value, name } }) => {
  state.pair = {
    ...state.pair,
    [name]: value,
  };
};

export const handleInput = ({ target: { value, name } }) => {
  state[name] = Number(value);
};
