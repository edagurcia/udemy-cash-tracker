"use server";

import { ErrorResponseSchema, DraftBudgetSchema, BudgetType } from "@/schemas";
import { getToken } from "@/auth/token";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function editBudget(
  budgetId: BudgetType["id"],
  prevState: ActionStateType, //? siempre el prevState debe ir antes del formData
  formData: FormData,
) {
  const jwt = await getToken();

  const budget = DraftBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/budgets/${budgetId}`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const result = ErrorResponseSchema.safeParse(json);

    return {
      errors: result.success
        ? [result.data.error]
        : [json.error || "Hubo un error al actualizar el presupuesto"],
      success: "",
    };
  }

  revalidatePath("/admin"); // actualiza el cache en toda esa url

  return {
    errors: [],
    success: "Presupuesto actualizado",
  };
}
