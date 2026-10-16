import { getAuthenticatedUser } from "@/auth/dal";
import { AdminMenu } from "@/components/admin/AdminMenu";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getAuthenticatedUser();

  return (
    <>
      <header className="bg-purple-950 py-5">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-96">
            <Link href={"/admin"}>
              <Logo />
            </Link>
          </div>
          <AdminMenu user={user} />
        </div>
      </header>
      <section className="max-w-5xl mx-auto mt-20 p-3 py-10">
        {children}
      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los Derechos Reservados {new Date().getFullYear()}
        </p>
      </footer>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </>
  );
}
