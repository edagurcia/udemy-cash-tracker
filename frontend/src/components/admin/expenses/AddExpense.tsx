"use client";

import { useActionState, useEffect } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { toast } from "react-toastify";
import { ExpenseForm } from "./ExpenseForm";
import { createExpense } from "@/actions/create-expense";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export const AddExpense = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { id } = useParams();

  const createExpenseWithBudgetId = createExpense.bind(null, +id!);

  const [state, dispatch] = useActionState(createExpenseWithBudgetId, {
    errors: [],
    success: "",
  });

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

    currentParams.delete("addExpense");
    currentParams.delete("showModal");

    const query = currentParams.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;
    window.history.replaceState({}, "", newUrl);
  };

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">
        Llena el formulario y crea un {""}
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
        <ExpenseForm />

        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Registrar Gasto"
        />
      </form>
    </>
  );
};
