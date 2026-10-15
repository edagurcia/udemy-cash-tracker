"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ErrorResponseSchema, LoginSchema } from "@/schemas";

export type ActionStateType = {
  errors?: string[];
  success?: string;
};

export async function authenticate(
  prevState: ActionStateType,
  formData: FormData,
) {
  const loginCredentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const auth = LoginSchema.safeParse(loginCredentials);

  if (!auth.success) {
    return {
      errors: auth.error.issues.map((err) => err.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/login`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: auth.data.email,
      password: auth.data.password,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const result = ErrorResponseSchema.safeParse(json);

    return {
      errors: result.success
        ? [result.data.error]
        : [json.error || "Error de autenticación"],
      success: "",
    };
  }

  (await cookies()).set({
    name: "CASHTRACKR_TOKEN",
    value: json,
    httpOnly: true,
    path: "/",
  });

  redirect("/admin");
}
