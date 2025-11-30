import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import "./globals.css";
import RegisterServiceWorker from "@/components/register-service-worker";
import { AuthProvider } from "@/contexts/auth-context";
import { AppointmentsProvider } from "@/contexts/appointments-context";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | Joyce Clínica Veterinária",
  description: "O melhor serviço veterinário oferecido a seu pet!",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/app-icon-512.png",
  },
  other: {
    "http-equiv": "Content-Security-Policy",
    content: "default-src 'self'; img-src 'self' data:;",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AppointmentsProvider>
        <html className={poppins.className} lang="pt-br">
          <body className="antialiased">
            <Header />
            {children}
            <Footer />
            <RegisterServiceWorker />
          </body>
        </html>
      </AppointmentsProvider>
    </AuthProvider>
  );
}
