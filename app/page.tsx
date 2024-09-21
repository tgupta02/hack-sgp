"use client";  // Marking this file as a Client Component since it uses hooks

import React from "react";
import Image from "next/image";
import ConnectButton from "./ConnectButton";
import { useSession } from "next-auth/react";  // Use session hook from NextAuth

export default function Home() {
  // Get the session data using NextAuth's useSession hook
  const { data: session, status } = useSession();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://yourappdomain.com/logo.png" // Replace with your own app's logo
          alt="Refugee Identification System Logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-xl sm:text-2xl font-bold">Refugee Identification System</h1>
        <p className="text-center sm:text-left">
          Empowering refugees with digital identification via Web3.
        </p>

        {/* Wallet Connect Button */}
        <ConnectButton />

        {/* Display session information */}
        {status === "authenticated" ? (
          <div>
            <p>Signed in as {session?.user?.email}</p>
            <p>Verification level: {session?.user?.verification_level}</p>
          </div>
        ) : (
          <p>Not signed in</p>
        )}

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://reown.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More about Reown
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://yourappdomain.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the Documentation
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://yourappdomain.com/faq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://yourappdomain.com/icons/faq-icon.svg" // Replace with your FAQ icon
            alt="FAQ icon"
            width={16}
            height={16}
          />
          FAQ
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://yourappdomain.com/contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://yourappdomain.com/icons/contact-icon.svg" // Replace with your Contact icon
            alt="Contact icon"
            width={16}
            height={16}
          />
          Contact Us
        </a>
      </footer>
    </div>
  );
}
