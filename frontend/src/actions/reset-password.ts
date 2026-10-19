"use server";

import {
  ErrorResponseSchema,
  ResetPasswordSchema,
  SuccessSchema,
} from "@/schemas";

export type ActionStateType = {
  errors?: string[];
  success?: string;
};

export async function resetPasswordAction(
  token: string,
  prevState: ActionStateType,
  formData: FormData,
): Promise<ActionStateType> {
  const resetPasswordInput = {
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput);

  if (!resetPassword.success) {
    return {
      errors: resetPassword.error.issues.map((err) => err.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/reset-password/${token}`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: resetPassword.data.password,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const result = ErrorResponseSchema.safeParse(json);

    return {
      errors: result.success
        ? [result.data.error]
        : [json.error || "Password invalido"],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json);
  return {
    errors: [],
    success,
  };
}
