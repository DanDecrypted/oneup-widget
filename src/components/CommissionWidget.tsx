import { useEffect, useState } from "react";
import CommissionApi from "../services/CommissionApi";
import "./CommissionWidget.css"
import CommissionBand from "../types/CommissionBand";
import CurrencyFormatter from "../services/CurrencyFormatter";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css";


const CommissionWidget = () => {
  const [commissionBands, setCommissionBands] = useState([] as CommissionBand[]);
  const [earnedCommission, setEarnedCommission] = useState(0);
  const [earnedCommissionPercentage, setEarnedCommissionPercentage] = useState(0);
  const [enteredRevenue, setEnteredRevenue] = useState(0);

  useEffect(() => {
    setCommissionBands(new CommissionApi().getCommissionBands());
  }, []);

  useEffect(() => {
    if (isNaN(enteredRevenue) || enteredRevenue === 0) {
      setCommissionBands(new CommissionApi().getCommissionBands());
      setEnteredRevenue(0);
      setEarnedCommission(0);
      setEarnedCommissionPercentage(0);
      return;
    }

    const remappedCommissionBands = commissionBands.map(band => {
      if (band.lowerBand === undefined || enteredRevenue >= band.lowerBand) {
        const chunk = band.upperBand === undefined ? 
          enteredRevenue - (band.lowerBand || 0) : 
          (band.upperBand > enteredRevenue ? enteredRevenue : band.upperBand)  - (band.lowerBand || 0); 

        return {...band, chunk, commission: chunk * band.percentage}
      }
      return {...band, chunk: 0, commission: 0};
    });

    setCommissionBands(remappedCommissionBands);
    console.log(remappedCommissionBands);

    const finalCommission  = remappedCommissionBands.map(c => c.commission).reduce((prev, curr) => prev + curr, 0);
    setEarnedCommission(finalCommission);
    setEarnedCommissionPercentage((finalCommission / enteredRevenue) * 100);
  }, [enteredRevenue])

  return <>
    <div className="card commission-card">
      <div className="header"> 
        <span className="circled fw-bold text-green border-green">£</span>
        <span className="title">Deal Commission</span>
        <div className="input-group">
          <label htmlFor="revenue">Revenue:</label>
          <input type="number" id="revnue" onChange={(e) => setEnteredRevenue(parseInt(e.target.value))} />
        </div>
      </div>
      <div className="body d-flex fd-row">
        <div>
          <CircularProgressbarWithChildren 
            value={earnedCommission}
            minValue={0}
            maxValue={enteredRevenue == 0 ? 100 : enteredRevenue}
            styles={buildStyles({
              pathColor: '#17991a'
            })}
          >
            <p key="percentage" style={{fontSize: '4rem'}}>
              {CurrencyFormatter.formatTrailingZeros(earnedCommissionPercentage)}%
            </p>
            <p key="revenue">
              {CurrencyFormatter.RenderCurrency(enteredRevenue)} Revenue
            </p>
            <p key="commission">
              {CurrencyFormatter.RenderCurrency(earnedCommission)} Commission
            </p>
          </CircularProgressbarWithChildren>
        </div>
        <div className="p-10">
          {commissionBands
            .filter(band => band.commission > 0)
            .map(band => <>
              <p style={{
                fontWeight: "bold"
              }}>
                {CurrencyFormatter.RenderCurrency(band.lowerBand || 0)}{band.upperBand && <> → {CurrencyFormatter.RenderCurrency(band.upperBand)}</>}{!band.upperBand && <>+</>}
              </p>
              <p style={{
                paddingBottom: "10px"
              }}>
                {CurrencyFormatter.RenderCurrency(band.commission)} ({band.percentage*100}% of {CurrencyFormatter.RenderCurrency(band.chunk)})
              </p>
            </>
          )}
          <p style={{
            fontWeight: "bold"
          }}>
            Total Commission
          </p>
          <p>
            {CurrencyFormatter.RenderCurrency(earnedCommission)}
          </p>
        </div>
      </div>
    </div>
  </>
}

export default CommissionWidget;