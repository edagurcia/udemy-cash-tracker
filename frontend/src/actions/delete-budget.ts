"use server";

import {
  ErrorResponseSchema,
  BudgetType,
  PasswordValidationSchema,
} from "@/schemas";
import { getToken } from "@/auth/token";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function deleteBudget(
  budgetId: BudgetType["id"],
  prevState: ActionStateType, //? siempre el prevState debe ir antes del formData
  formData: FormData,
) {
  const jwt = await getToken();

  // validar que el password es correcto para eliminar presupuesto

  const currentPassword = PasswordValidationSchema.safeParse(
    formData.get("password"),
  );

  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const urlCheckPassword = `${process.env.API_URL}/auth/check-password`;

  const reqCheckPassword = await fetch(urlCheckPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      password: currentPassword.data,
    }),
  });

  const jsonCheckPassword = await reqCheckPassword.json();

  if (!reqCheckPassword.ok) {
    const result = ErrorResponseSchema.safeParse(jsonCheckPassword);

    return {
      errors: result.success
        ? [result.data.error]
        : [jsonCheckPassword.error || "Hubo un error al confirmar contraseña"],
      success: "",
    };
  }

  // eliminar el presupuesto
  const urlDeleteBudget = `${process.env.API_URL}/budgets/${budgetId}`;

  const reqDeleteBudget = await fetch(urlDeleteBudget, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const jsonDeleteBudget = await reqDeleteBudget.json();

  if (!reqDeleteBudget.ok) {
    const result = ErrorResponseSchema.safeParse(jsonDeleteBudget);

    return {
      errors: result.success
        ? [result.data.error]
        : [jsonDeleteBudget.error || "Hubo un error al eliminar presupuesto"],
      success: "",
    };
  }

  revalidatePath("/admin"); // actualiza el cache en toda esa url

  return {
    errors: [],
    success: "Presupuesto eliminado",
  };
}
