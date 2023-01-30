export const getFullTitle = (codes, code) => {
  const [, title] = codes.find((item) => item.includes(code));
  return title;
};

export const formatToCurrency = (code, amount) => {
  return new Intl.NumberFormat("ru", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const convertTime = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("ru", options).format(new Date(date));
};
