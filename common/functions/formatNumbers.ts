function hasFloatingPoint(number: number): boolean {
  return number !== Math.floor(number);
}
function getFormattedNumbers(
  number: number,
  numberAmmount: number,
  numberIndex: string
): string {
  let getNumberInFloat = parseFloat((number / numberAmmount).toFixed(3));
  if (hasFloatingPoint(getNumberInFloat)) {
    let decimalPart = (getNumberInFloat % 1) * 1000;
    if (decimalPart > 100) {
      if (`${Math.floor(number / numberAmmount)}`?.length == 3) {
        return `${Math.floor(number / numberAmmount)}${numberIndex}+`;
      } else {
        return `${Math.floor(number / numberAmmount)}.${Math.floor(
          decimalPart / 100
        )}${numberIndex}+`;
      }
    } else {
      return `${Math.floor(number / numberAmmount)}${numberIndex}`;
    }
  } else {
    return `${Math.floor(number / numberAmmount)}${numberIndex}`;
  }
}
export function formatNumber(number: number): string {
  if (number >= 1000000000) {
    return getFormattedNumbers(number, 1000000000, "B");
  } else if (number >= 1000000) {
    return getFormattedNumbers(number, 1000000, "M");
  } else if (number >= 1000) {
    return getFormattedNumbers(number, 1000, "K");
  } else {
    return number.toString();
  }
}
