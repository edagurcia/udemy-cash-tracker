import Link from "next/link";
import type { Metadata } from "next";
import { EditBudget } from "@/components/admin/budgets/EditBudget";
import { getBudget } from "@/services/budget";

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

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const budget = await getBudget(id);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto mr-5">
          <h1 className="font-black text-3xl text-purple-950 my-5">
            Editar Presupuesto: {budget.name}
          </h1>
          <p className="text-xl font-bold">
            Actualiza la información de tu {""}
            <span className="text-amber-500">presupuesto</span>
          </p>
        </div>
        <Link
          href={"/admin"}
          className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Volver
        </Link>
      </div>
      <div className="p-10 mt-10  shadow-lg border ">
        <EditBudget budget={budget} />
      </div>
    </>
  );
}
