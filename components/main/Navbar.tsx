"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Socials } from "../../constants";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        {/* Logo */}
        <a href="#about-me" className="h-auto w-auto flex flex-row items-center">
          <Image
            src="/NavLogo.png"
            alt="logo"
            width={70}
            height={70}
            className="cursor-pointer hover:animate-slowspin"
          />
          <span className="font-bold ml-[10px] hidden md:block text-gray-300">
            Urbano-Way
          </span>
        </a>

        {/* Navigation Links */}
        <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            <a href="#about-us" className="cursor-pointer">
              About us
            </a>
            <a href="#resources" className="cursor-pointer">
              Resources
            </a>
            <Link href="/booking" className="cursor-pointer">
              Get Started
            </Link>
          </div>
        </div>

        {/* Social Icons & User Auth Buttons */}
        <div className="flex flex-row items-center gap-5">
          {Socials.map((social) => (
            <Image
              src={social.src}
              alt={social.name}
              key={social.name}
              width={24}
              height={24}
            />
          ))}

          {/* Clerk Authentication */}
          <SignedOut>
            <SignInButton
              mode="modal"
              className="bg-[#4f46e5] flex text-white px-4 py-2 rounded-lg shadow-md transition-all hover:bg-[#4338ca] hover:shadow-lg focus:ring-2 focus:ring-[#4f46e5] focus:ring-opacity-50"
            />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
