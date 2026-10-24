"use client";

import { useRouter } from "next/navigation";

export const AddExpenseButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="bg-purple-800 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center cursor-pointer"
      onClick={() => router.push(`?addExpense=true&showModal=true`)}
    >
      Agregar Gasto
    </button>
  );
};
