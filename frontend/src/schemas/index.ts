import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "El correo es obligatorio" })
      .email({ message: "El correo no es valido" }),
    name: z.string().min(1, { message: "El nombre es obligatorio" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe ser mínimo 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no son iguales",
    path: ["password_confirmation"],
  });

export const SuccessSchema = z.string().min(1, { message: "Valor no valido" });

export const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const TokenSchema = z
  .string({ message: "Token no valido" })
  .min(6, { message: "Token no valido" })
  .max(6, { message: "Token no valido" });
