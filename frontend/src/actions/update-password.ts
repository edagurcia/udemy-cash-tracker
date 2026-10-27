"use server";

import { getToken } from "@/auth/token";
import {
  ErrorResponseSchema,
  SuccessSchema,
  UpdatePasswordSchema,
} from "@/schemas";

type ActionStateType = {
  errors?: string[];
  success?: string;
};

export async function updatePassword(
  prevState: ActionStateType,
  formData: FormData,
) {
  const jwt = await getToken();

  const userPassword = UpdatePasswordSchema.safeParse({
    current_password: formData.get("current_password"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  });

  if (!userPassword.success) {
    return {
      errors: userPassword.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/update-password`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      currentPassword: userPassword.data.current_password,
      newPassword: userPassword.data.password,
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
