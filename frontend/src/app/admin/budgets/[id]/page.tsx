import Link from "next/link";
import type { Metadata } from "next";
import { getBudget } from "@/services/budget";
import { AddExpenseButton } from "@/components/admin/expenses/AddExpenseButton";
import ModalContainer from "@/components/ui/ModalContainer";
import { formatCurrency, formatDateLong } from "@/utils";
import { ExpenseMenu } from "@/components/admin/expenses/ExpenseMenu";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const budget = await getBudget(id);

  return {
    title: `CashTrackr | ${budget.name}`,
  };
}

export default async function BudgetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const budget = await getBudget(id);

  return (
    <>
      <div className="w-full flex justify-between items-center gap-5">
        <div>
          <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
          <p className="text-xl font-bold">
            Administra tus {""} <span className="text-amber-500">gastos</span>
          </p>
        </div>

        <AddExpenseButton />

        <Link
          href={"/admin"}
          className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Volver
        </Link>
      </div>

      {budget.expenses.length ? (
        <>
          <h1 className="text-2xl font-bold text-purple-950 mt-10">
            Gastos registrados:
          </h1>

          <ul
            role="list"
            className="divide-y divide-gray-300 border shadow-lg mt-10 "
          >
            {budget.expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {expense.name}
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {formatCurrency(+expense.amount)}
                    </p>
                    <p className="text-gray-500  text-sm">
                      Agregado:{" "}
                      <span className="font-bold">
                        {formatDateLong(expense.updatedAt)}
                      </span>
                    </p>
                  </div>
                </div>
                <ExpenseMenu expenseId={expense.id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center py-20">No hay gastos</p>
      )}

      <ModalContainer />
    </>
  );
}
