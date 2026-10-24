"use client";

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { createBudget } from "@/actions/create-budget";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useRouter } from "next/navigation";
import { BudgetForm } from "./BudgetForm";

export const CreateBudget = () => {
  const router = useRouter();

  const [state, dispatch] = useActionState(createBudget, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        toastId: "budget-toast",
      });
      router.push("/admin");
    }
  }, [state, router]);

  return (
    <form action={dispatch} className="mt-10 space-y-3" noValidate>
      {state.errors.map((err, i) => (
        <ErrorMessage key={i}>{err}</ErrorMessage>
      ))}

      <BudgetForm />

      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value="Crear Presupuesto"
      />
    </form>
  );
};
