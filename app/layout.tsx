import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Provider from "@/components/Provider";
import "./globals.css"
import { Suspense } from "react";
import Image from "next/image";
import NavigationBar from "@/components/cardsui/NavigationBar";
import Script from "next/script";
import { Bounce, ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreviousPage from "@/components/ui/PreviousPage";


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});


export const metadata: Metadata = {
  title: "SpaceMatch || PropTech",
  description: "A property tech company owned by Teechng.",
  icons: {
    icon: "/logo/sm.png"
  }
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased min-h-screen`}
      >
        <Provider>
          <Suspense fallback={
            <div className="h-screen flex justify-center items-center text-30 font-bold w-full">
              <Image src={"/logo/sm.png"} width={100} height={100} alt="logo" className="animate-pulse shadow-sm rounded-full"/>
            </div>
          }>
            <NavigationBar/>
              {children}     
            {/* <Toaster /> */}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
            <PreviousPage/>
          </Suspense>
        </Provider>
        <Script src="/js/squad.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
