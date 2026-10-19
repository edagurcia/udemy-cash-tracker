"use server";

import { ErrorResponseSchema, TokenSchema } from "@/schemas";

export type ActionStateType = {
  errors?: string[];
  success?: string;
};

export async function validateTokenAction(
  token: string,
  prevState: ActionStateType,
): Promise<ActionStateType> {
  const validateToken = TokenSchema.safeParse(token);

  if (!validateToken.success) {
    return {
      errors: validateToken.error.issues.map((err) => err.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/validate-token`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: validateToken.data,
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
    success: "Token valido, asigna una nueva contraseña",
  };
}
