import type { ReactNode } from "react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { Logo } from "@/components/ui/Logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2 lg:min-h-screen items-start">
        <div className="bg-purple-950 flex justify-center relative overflow-hidden lg:h-screen lg:sticky lg:top-0">
          <div className="w-96 py-10 lg:py-20 z-10">
            <Logo />
          </div>

          <div className="hidden lg:block absolute bottom-0 left-0 w-[65%] h-[40%] pointer-events-none">
            <Image
              src="/grafico.svg"
              alt="Gráfico decorativo"
              fill
              className="object-cover object-left"
              priority
            />
          </div>
        </div>

        <div className="p-10 lg:py-28 flex items-center min-h-screen">
          <div className="max-w-3xl w-full mx-auto">{children}</div>
        </div>
      </div>

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
