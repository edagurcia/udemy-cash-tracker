import Link from "next/link";
import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "CashTrackr | Restablecer contraseña",
  description: "Restablecer contraseña",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        ¿Olvido su contraseña?
      </h1>
      <p className="font-bold text-3xl">
        aquí puedes <span className="text-amber-500">restablecerla</span>
      </p>

      <ForgotPasswordForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link href="/auth/login" className="text-center text-gray-500">
          Ya tienes cuenta? Iniciar sesión
        </Link>

        <Link href="/auth/register" className="text-center text-gray-500">
          ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </>
  );
}
