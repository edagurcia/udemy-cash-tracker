"use client";

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { editBudget } from "@/actions/edit-budget";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useRouter } from "next/navigation";
import { BudgetForm } from "./BudgetForm";
import { BudgetType } from "@/schemas";

type Props = {
  budget: BudgetType;
};

export const EditBudget = ({ budget }: Props) => {
  const router = useRouter();

  const editBudgetWithId = editBudget.bind(null, budget.id);

  const [state, dispatch] = useActionState(editBudgetWithId, {
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

      <BudgetForm budget={budget} />

      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value="Guardar Presupuesto"
      />
    </form>
  );
};
