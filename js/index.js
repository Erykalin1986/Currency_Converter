import variables from "./variables.js";
import state from "./state.js";
import { handleChange } from "./convert.js";

const { selects } = variables;

const renderCodeList = () => {
  selects.forEach((select) => {
    state.codes.forEach(([code]) => {
      const element = document.createElement("option");
      element.value = code;
      element.innerText = code;
      select.insertAdjacentElement("beforeend", element);
    });

    const name = select.getAttribute("name");
    name && select.addEventListener("change", handleChange);
  });
};

export const fetchCodes = async () => {
  try {
    let myHeaders = new Headers();
    myHeaders.append("apikey", state.apiKey);

    let requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    const response = await fetch(`${state.url}/list`, requestOptions);
    const data = await response.json();

    if (data.success) {
      state.codes = Object.entries(data.currencies);
      renderCodeList();
    }
  } catch (error) {
    console.log(error);
  }
};
