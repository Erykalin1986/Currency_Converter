import variables from "./variables.js";
import state from "./state.js";
import { handleChange } from "./convert.js";
import { fetchLatest } from "./single.js";

const { selects, success, tabs } = variables;

/**
 * Заполняет список кодов в меню выбора.
 */
const renderCodeList = () => {
  selects.forEach((select) => {
    state.codes.forEach(([code]) => {
      const element = document.createElement("option");
      element.value = code;
      element.innerText = code;
      select.insertAdjacentElement('beforeend', element);
    });

    const name = select.getAttribute('name');
    name && select.addEventListener('change', handleChange);
  });
};

/**
 * Получает список кодов валют.
 */
export const fetchCodes = async () => {
  try {
    let myHeaders = new Headers();
    myHeaders.append('apikey', state.apiKey);

    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    const response = await fetch(`${state.url}/list`, requestOptions);
    const data = await response.json();

    if (data.success) {
      state.codes = Object.entries(data.currencies);
      renderCodeList();
      fetchLatest();
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Переключает вкладки.
 * @param {*} param0 Выбранный элемент вкладки.
 */
export const handleTabClick = ({ currentTarget: target }) => {
  const { tab } = target.dataset;
  const children = document.querySelectorAll('.content');

  if (!tab || tab === state.currentTab) return;

  tabs.forEach((item) => item.classList.remove('active'));
  target.classList.add("active");

  for (const child of children) {
    if (child.dataset.child === tab) child.classList.add('show');
    else child.classList.remove('show');
  }

  state.currentTab = tab;
};
