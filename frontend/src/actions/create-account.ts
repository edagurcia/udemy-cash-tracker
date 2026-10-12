"use server";

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from "@/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function register(prevState: ActionStateType, formData: FormData) {
  const inputData = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  // validar que la data del formulario
  const result = RegisterSchema.safeParse(inputData);

  if (!result.success) {
    // en caso de error devolver errors y success vacío
    const errors = result.error.issues.map((error) => error.message);
    return { errors, success: prevState.success };
  }

  const validatedData = result.data;

  // enviar la data al backend
  const url = `${process.env.API_URL}/auth/create-account`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
    }),
  });

  const json = await req.json(); // respuesta de backend

  if (req.status === 409) {
    const { error } = ErrorResponseSchema.parse(json);

    return {
      errors: [error],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json);

  return {
    // devuelve el arreglo de errores vacío y la respuesta de backend
    errors: [],
    success,
  };
}
