export default interface CommissionBand {
  commission: number;
  chunk: number;
  lowerBand: number | undefined;
  upperBand: number | undefined;
  percentage: number;
}