"use client";

import { useActionState, startTransition, useEffect } from "react";
import { toast } from "react-toastify";
import { ActionStateType, forgotPassword } from "@/actions/forgot-password";

export const ForgotPasswordForm = () => {
  const [state, dispatch] = useActionState(forgotPassword, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.map((err) => {
        toast.error(err);
      });
    }

    if (state.success) {
      toast.success(state.success);
    }
  }, [state]);

  return (
    <form action={dispatch} className="mt-14 space-y-5" noValidate>
      <div className="flex flex-col gap-2 mb-10">
        <label className="font-bold text-2xl" htmlFor="email">
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="Email de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="email"
        />
      </div>

      <input
        type="submit"
        value="Enviar Instrucciones"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer"
      />
    </form>
  );
};
