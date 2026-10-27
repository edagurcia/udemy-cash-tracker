"use client";

import { formatCurrency } from "@/utils";

type Props = {
  label: string;
  amount: number;
};

export const Amount = ({ label, amount }: Props) => {
  return (
    <p className="w-full flex justify-between text-xl font-semibold">
      {label}: <span className="text-amber-500">{formatCurrency(amount)}</span>
    </p>
  );
};
