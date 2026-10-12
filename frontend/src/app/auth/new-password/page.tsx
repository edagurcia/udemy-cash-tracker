import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CashTrackr | Restablecer contraseña",
  description: "Restablecer contraseña",
};

export default function NewPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        Restablece tu contraseña
      </h1>
      <p className="font-bold text-3xl">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>
    </>
  );
}
