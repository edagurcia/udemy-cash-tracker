"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  totalSpendPercentage: number;
};

export const ProgressBar = ({ totalSpendPercentage = 0 }: Props) => {
  return (
    <div>
      <CircularProgressbar
        styles={buildStyles({
          pathColor: totalSpendPercentage >= 100 ? "#DC2626" : "#F59E0B",
          trailColor: "#e1e1e1",
          textColor: "#F59E0B",
          textSize: 8,
        })}
        value={totalSpendPercentage}
        text={`${totalSpendPercentage}% Gastado`}
      />
    </div>
  );
};
