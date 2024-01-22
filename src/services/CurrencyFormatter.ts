export default class CurrencyFormatter {
  static formatTrailingZeros = (decimal: number) => {
    let decimalString = decimal.toFixed(2);

    if (decimalString.endsWith(".00")) 
      decimalString = decimalString.replace(".00", "");

    return decimalString;
  }

  static RenderCurrency = (amount: number, currencySymbol: string = "£") => {
    
    const units = ['', 'K', 'M', 'B', 'T', 'Q'];

    const findUnit = (currAmount: number, onUnit: number = 0): {amount: number, unit: string} => {
      if (Math.trunc(currAmount / 1000) > 0 && onUnit < units.length) 
        return findUnit(currAmount / 1000, onUnit + 1);
      
      return {
        amount: currAmount, 
        unit: units[onUnit]
      }
    }

    const divisorUnit = findUnit(amount);
    if (divisorUnit) {
      return `${currencySymbol}${CurrencyFormatter.formatTrailingZeros(divisorUnit.amount)}${divisorUnit.unit}`;
    }

    return `${currencySymbol}${CurrencyFormatter.formatTrailingZeros(amount)}`;
  }
}