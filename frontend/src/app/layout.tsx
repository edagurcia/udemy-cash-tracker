import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ToastContainer } from "react-toastify";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CashTrackr",
  description: "Maneja tus presupuestos",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        outfit.className,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}

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
      </body>
    </html>
  );
}
