export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export function makeFirstLetterUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function round(value, precision) {
  let multiplier = Math.pow(10, precision || 0);
  let roundedValue = Math.round(value * multiplier) / multiplier;

  return roundedValue.toFixed(precision);
}

export const dateFormating = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return dateFormating.format(date);
};

export function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
