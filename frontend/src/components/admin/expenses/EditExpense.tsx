"use client";

import { useActionState, useEffect, useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { toast } from "react-toastify";
import { ExpenseForm } from "./ExpenseForm";
import type { DraftExpenseType } from "@/schemas";
import { editExpense } from "@/actions/edit-expense";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export const EditExpense = () => {
  const [expense, setExpense] = useState<DraftExpenseType>();

  const { id: budgetId } = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("editExpenseId");

  const editExpenseWithBudgetId = editExpense.bind(null, {
    budgetId: +budgetId!,
    expenseId: +expenseId!,
  });

  const [state, dispatch] = useActionState(editExpenseWithBudgetId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (!budgetId || !expenseId) return;

    const url = `/admin/api/budgets/${budgetId}/expenses/${expenseId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setExpense(data))
      .catch((error) => console.error("Error fetching expense:", error));
  }, [budgetId, expenseId]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        toastId: "budget-toast",
      });
      removeQueryParams();
    }
  }, [state]);

  const removeQueryParams = () => {
    const currentParams = new URLSearchParams(searchParams.toString());

    currentParams.delete("editExpenseId");
    currentParams.delete("showModal");

    const query = currentParams.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;
    window.history.replaceState({}, "", newUrl);
  };

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Edita los detalles de un {""}
        <span className="text-amber-500">gasto</span>
      </p>

      {state.errors.map((error, i) => (
        <ErrorMessage key={i}>{error}</ErrorMessage>
      ))}

      <form
        action={dispatch}
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
      >
        <ExpenseForm expense={expense} />

        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Guardar Cambios"
        />
      </form>
    </>
  );
};
