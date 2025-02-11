"use client";

import { useState } from "react";
import { ArrowRightIcon, LockClosedIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import PopupNo from "@/app/popup-no"; // Pastikan path sesuai dengan lokasi file

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main style={{ backgroundColor: "rgba(254, 254, 254, 0.92)" }}>
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-lg">
        <div style={{ backgroundColor: "rgb(255, 255, 255)" }} className="flex items-center justify-between px-6 md:px-12 py-4">
          <Image src="/logo/uia-logo.png" width={150} height={100} className="w-20 md:w-20 lg:w-40 h-auto transition-all duration-300" alt="logo" />
          <button className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
            <Bars3Icon className="w-7 h-7" />
          </button>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-2 text-gray-800 text-sm md:text-base font-medium transition hover:text-gray-300">
              <LockClosedIcon className="w-5 h-5" />
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-50 flex flex-col`}>
        <div className="bg-[rgb(10,97,96)] flex items-center justify-center mx-2 mt-2 p-6 rounded-md">
          <Image src="/logo/uia-logo.png" width={120} height={80} alt="Sidebar Logo" />
        </div>
        <div className="absolute top-4 right-4">
          <button className="text-white" onClick={() => setMenuOpen(false)}>
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>
        <div className="mt-auto flex flex-col items-center gap-4 pb-10">
          <Link href="/login" className="w-4/5 text-center py-2 text-gray-800 bg-gray-300 rounded-md">
            Login
          </Link>
        </div>
      </div>
      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>}

      {/* Wrapper Tengah */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center text-center px-6 py-10 md:w-3/5 md:px-20 mt-[120px]">
          <Image src="/logo/body.png" width={500} height={250} alt="Body Image" />
          <p className="text-xl text-gray-800 md:text-3xl md:leading-normal mt-8">
            <strong>Selamat Datang Di UIA Rental Car!</strong>
          </p>
          <p className="text-10px text-gray-800 md:text-3xl md:leading-normal">
            Rental Mobil Amanah Dan Terpercaya
          </p>

          {/* Container List Mobil */}
          <div className="mt-6 w-full max-w-md">
            <Link href="/items">
              <div className="flex items-center justify-center gap-2 bg-[rgb(10,97,96)] text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition hover:bg-[rgb(8,85,85)]">
                List Mobil
                <ArrowRightIcon className="w-6 h-6" />
              </div>
            </Link>
          </div>

          <div className="mt-6 bg-gray-200 p-6 shadow-lg rounded-lg w-full mt-[100px]">
            <div className="grid grid-cols-1 gap-4 justify-center">
              <p>Kelompok 4</p>
              <p>alya Camilla (3420210021)</p>
              <p>Mochamad Irham Ahmadi (3420210020)</p>
              <p> Muhammad AbdulAlaa AlMaududie (3420210018)</p>
              <p>Salman Alfaridzi (3420210017)</p>
              <p>Raihan ramadhan (3420210009)</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
