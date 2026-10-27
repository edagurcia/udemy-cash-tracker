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

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es Obligatorio" })
    .email({ message: "Email no válido" }),
  password: z.string().min(1, { message: "El Password no puede ir vacío" }),
});

export const TokenSchema = z
  .string({ message: "Token no valido" })
  .min(6, { message: "Token no valido" })
  .max(6, { message: "Token no valido" });

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es Obligatorio" })
    .email({ message: "Email no válido" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "El Password debe ser de al menos 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"],
  });

export const DraftBudgetSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del presupuesto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const DraftExpenseSchema = z.object({
  name: z.string().min(1, { message: "El Nombre del gasto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const ExpenseAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  budgetId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(ExpenseAPIResponseSchema),
});

// el omit se utiliza en este caso porque la api de budgets no trae el arreglo de expenses
// expenses viene hasta que llamamos a un budget por su ID
// el llamado al arreglo de budgets falla por eso, el omit lo corrige

export const BudgetsAPIResponseSchema = z.array(
  BudgetAPIResponseSchema.omit({ expenses: true }),
);

export const PasswordValidationSchema = z
  .string()
  .min(1, { message: "Contraseña es obligatoria" });

export const UpdatePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "La contraseña actual es obligatoria" }),
    password: z
      .string()
      .min(8, { message: "El Password debe ser de al menos 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"],
  });

export const SuccessSchema = z.string().min(1, { message: "Valor no valido" });

export const ErrorResponseSchema = z.object({
  error: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;

export type BudgetType = z.infer<typeof BudgetAPIResponseSchema>;

export type ExpenseType = z.infer<typeof ExpenseAPIResponseSchema>;

export type DraftExpenseType = z.infer<typeof DraftExpenseSchema>;
