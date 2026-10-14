import type { Metadata } from "next";
import { ConfirmAccountForm } from "@/components/auth/ConfirmAccountForm";

export const metadata: Metadata = {
  title: "CashTrackr | Confirmar cuenta",
  description: "Confirme su cuenta",
};

export default function ConfirmAccountPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        Confirma tu cuenta
      </h1>
      <p className="font-bold text-3xl">
        Ingrese el código que recibió{" "}
        <span className="text-amber-500">por correo</span>
      </p>

      <ConfirmAccountForm />
    </>
  );
}
