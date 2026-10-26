"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { toast } from "react-toastify";
import { deleteExpense } from "@/actions/delete-expense";
import { useActionState, useEffect, startTransition } from "react";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export const DeleteExpense = () => {
  const { id: budgetId } = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("deleteExpenseId")!;

  const deleteExpenseWithBudgetId = deleteExpense.bind(null, {
    budgetId: +budgetId!,
    expenseId: +expenseId!,
  });

  const [state, dispatch] = useActionState(deleteExpenseWithBudgetId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (!Number.isInteger(+budgetId!) || !Number.isInteger(+expenseId)) {
      removeQueryParams();
    }
  }, []);

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

    currentParams.delete("deleteExpenseId");
    currentParams.delete("showModal");

    const query = currentParams.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;
    window.history.replaceState({}, "", newUrl);
  };

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Eliminar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Confirma para eliminar, {""}
        <span className="text-amber-500">el gasto</span>
      </p>
      <p className="text-gray-600 text-sm">
        (Un gasto eliminado no se puede recuperar)
      </p>

      {state.errors.map((error, i) => (
        <ErrorMessage key={i}>{error}</ErrorMessage>
      ))}

      <div className="grid grid-cols-2 gap-5 mt-10">
        <button
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          onClick={removeQueryParams}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
          onClick={() => {
            startTransition(() => {
              dispatch();
            });
          }}
        >
          Eliminar
        </button>
      </div>
    </>
  );
};
