import CommissionBand from "../types/CommissionBand";

export default class CommissionApi {
  getCommissionBands(): CommissionBand[] {
    return [
      {
        commission: 0,
        chunk: 0,
        lowerBand: undefined,
        upperBand: 5_000,
        percentage: 0
      },
      {
        commission: 0,
        chunk: 0,
        lowerBand: 5_000,
        upperBand: 10_000,
        percentage: 0.1
      },
      {
        commission: 0,
        chunk: 0,
        lowerBand: 10_000,
        upperBand: 15_000,
        percentage: 0.15
      },
      {
        commission: 0,
        chunk: 0,
        lowerBand: 15_000,
        upperBand: 20_000,
        percentage: 0.2
      },
      {
        commission: 0,
        chunk: 0,
        lowerBand: 20_000,
        upperBand: undefined,
        percentage: 0.25
      }
    ]
  }
}