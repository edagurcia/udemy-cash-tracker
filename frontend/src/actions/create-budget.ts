"use server";

import { ErrorResponseSchema, DraftBudgetSchema } from "@/schemas";
import { getToken } from "@/auth/token";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function createBudget(
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

  const url = `${process.env.API_URL}/budgets`;

  const req = await fetch(url, {
    method: "POST",
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
        : [json.error || "Hubo un error al crear el presupuesto"],
      success: "",
    };
  }

  revalidatePath("/admin");

  return {
    errors: [],
    success: "Presupuesto creado",
  };
}
