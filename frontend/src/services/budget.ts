import { cache } from "react";
import { notFound } from "next/navigation";
import { getToken } from "@/auth/token";
import { BudgetAPIResponseSchema } from "@/schemas";

// cache se utiliza para evitar doble consulta

export const getBudget = cache(async (budgetId: string) => {
  const jwt = await getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const json = await req.json();

  if (!req.ok) {
    notFound();
  }

  const budget = BudgetAPIResponseSchema.parse(json);

  return budget;
});
