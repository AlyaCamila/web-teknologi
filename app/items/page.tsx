"use client";

import { useState } from "react";
import { ArrowRightIcon, LockClosedIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import PopupNo from "@/app/popup-no";

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <main style={{ backgroundColor: "rgb(247, 246, 246)" }}> {/* Warna background diubah */}
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-lg">
        <div style={{ backgroundColor: "rgba(255, 255, 255)" }} className="flex items-center justify-between px-6 md:px-12 py-4">
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
        <div className="flex flex-col items-center text-center px-6 py-10 md:w-3/5 md:px-20 mt-[120px] w-full">

          {/* Header di luar container */}
          <div className="w-full bg-blue-800 py-4 text-center text-lg text-white font-semibold shadow-md rounded-t-lg">
            Silahkan Pilih Mobil
          </div>

          {/* Container Game */}
          <div className="bg-white p-6 shadow-lg rounded-b-lg w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {/* Avanza */}
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer" 
              onClick={() => window.location.href = "/home/mobil-sewa"}>
                <Image src="/mobil/avanza.png" width={200} height={200} alt="Avanza" className="rounded-md transition-transform transform hover:scale-110 mx-auto" />
                <strong className="mt-4 text-lg">AVANZA</strong>
                </div>

              {/* Alphard */}
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer" onClick={() => setIsPopupOpen(true)}>
                <Image src="/mobil/alphard.png" width={200} height={200} alt="Alphard" className="rounded-md transition-transform transform hover:scale-110 mx-auto" />
                <strong className="mt-4 text-lg">ALPHARD</strong>
              </div>
              {isPopupOpen && <PopupNo onClose={() => setIsPopupOpen(false)} />}

              {/* Fortuner */}
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer" onClick={() => setIsPopupOpen(true)}>
                <Image src="/mobil/fortuner.png" width={200} height={200} alt="Fortuner" className="rounded-md transition-transform transform hover:scale-110 mx-auto" />
                <strong className="mt-4 text-lg">FORTUNER</strong>
              </div>
              {isPopupOpen && <PopupNo onClose={() => setIsPopupOpen(false)} />}

              {/* Pajero */}
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer" onClick={() => setIsPopupOpen(true)}>
                <Image src="/mobil/pajero.png" width={200} height={200} alt="Pajero" className="rounded-md transition-transform transform hover:scale-110 mx-auto" />
                <strong className="mt-4 text-lg">PAJERO</strong>
              </div>
              {isPopupOpen && <PopupNo onClose={() => setIsPopupOpen(false)} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
