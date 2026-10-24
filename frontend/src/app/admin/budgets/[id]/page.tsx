import Link from "next/link";
import type { Metadata } from "next";
import { getBudget } from "@/services/budget";
import { AddExpenseButton } from "@/components/admin/expenses/AddExpenseButton";
import ModalContainer from "@/components/ui/ModalContainer";

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

      <ModalContainer />
    </>
  );
}
