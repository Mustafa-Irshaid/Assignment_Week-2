// Formatting Number

export const numberFormat = (number) => {
  return new Intl.NumberFormat("en-IN").format(number);
};
