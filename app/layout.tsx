import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import "../styles/globals.css"
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

 
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Optimizing_Urban_Mobility",
  description: "This is Home Page",
};

export default function RootLayout({ children,}: {
  children: React.ReactNode; }) {

  return (
    <ClerkProvider signInUrl="/sign-in">
    <html lang="en">
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <StarsCanvas />
        <Navbar />
        <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        {children}
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
