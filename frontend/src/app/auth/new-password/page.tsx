import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CashTrackr | Restablecer contraseña",
  description: "Restablecer contraseña",
};

export default function NewPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        Restablecer Password
      </h1>
      <p className="text-3xl font-bold">
        Ingresa el código que recibiste
        <span className="text-amber-500"> por email</span>
      </p>

      <ResetPasswordForm />
    </>
  );
}
