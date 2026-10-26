"use server";

import {
  ErrorResponseSchema,
  DraftExpenseSchema,
  BudgetType,
  ExpenseType,
} from "@/schemas";
import { getToken } from "@/auth/token";
import { revalidatePath } from "next/cache";

type BudgetAndExpenseType = {
  budgetId: BudgetType["id"];
  expenseId: ExpenseType["id"];
};

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function deleteExpense(
  { budgetId, expenseId }: BudgetAndExpenseType,
  prevState: ActionStateType, //? siempre el prevState debe ir antes del formData
) {
  const jwt = await getToken();

  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;

  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const json = await req.json();

  if (!req.ok) {
    const result = ErrorResponseSchema.safeParse(json);

    return {
      errors: result.success
        ? [result.data.error]
        : [json.error || "Hubo un error al eliminar el gasto"],
      success: "",
    };
  }

  revalidatePath(`/admin/budgets/${budgetId}`);

  return {
    errors: [],
    success: "Gasto eliminado",
  };
}
