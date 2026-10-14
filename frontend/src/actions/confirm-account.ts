"use server";

import { ErrorResponseSchema, TokenSchema } from "@/schemas";

export type ActionStateType = {
  errors?: string[];
  success?: string;
};

export async function confirmAccountAction(
  token: string,
  prevState: ActionStateType,
): Promise<ActionStateType> {
  const confirmToken = TokenSchema.safeParse(token);

  if (!confirmToken.success) {
    return {
      errors: confirmToken.error.issues.map((err) => err.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/confirm-account`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: confirmToken.data,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const result = ErrorResponseSchema.safeParse(json);

    return {
      errors: result.success
        ? [result.data.error]
        : [json.error || "Token no válido o expirado"],
      success: "",
    };
  }

  return {
    errors: [],
    success: "Token confirmado",
  };
}
