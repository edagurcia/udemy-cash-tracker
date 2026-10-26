"use server";

import { ErrorResponseSchema, DraftExpenseSchema } from "@/schemas";
import { getToken } from "@/auth/token";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function createExpense(
  budgetId: number,
  prevState: ActionStateType, //? siempre el prevState debe ir antes del formData
  formData: FormData,
) {
  const jwt = await getToken();

  const expenseData = {
    name: formData.get("name"),
    amount: formData.get("amount"),
  };

  const expense = DraftExpenseSchema.safeParse(expenseData);

  if (!expense.success) {
    return {
      errors: expense.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const result = ErrorResponseSchema.safeParse(json);

    return {
      errors: result.success
        ? [result.data.error]
        : [json.error || "Hubo un error al crear el gasto"],
      success: "",
    };
  }

  // el revalidate path en este caso debe ser dinamico
  // ya que el gasto pertenece a un presupuesto

  revalidatePath(`/admin/budgets/${budgetId}`);

  return {
    errors: [],
    success: "Gasto registrado",
  };
}
