const randomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export { randomColor, numberWithCommas };
