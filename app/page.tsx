"use client";

import { useState } from "react";
import { ArrowRightIcon, LockClosedIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import PopupNo from "@/app/popup-no"; // Pastikan path sesuai dengan lokasi file

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <main style={{ backgroundColor: "rgb(232,246,244)" }}>
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div style={{ backgroundColor: "rgb(10,97,96)" }} className="flex items-center justify-between px-6 md:px-12 py-4">
        <Image src="/logo/logo.PNG" width={100} height={70} className="w-20 md:w-20 lg:w-20 h-auto transition-all duration-300" alt="logo" />
          <button className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
            <Bars3Icon className="w-7 h-7" />
          </button>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-2 text-white text-sm md:text-base font-medium transition hover:text-gray-300">
              <LockClosedIcon className="w-5 h-5" />
              Login
            </Link>
            {/*<Link href="/register" className="flex items-center gap-2 bg-white text-sm md:text-base font-medium text-gray-800 p-2 rounded-md transition hover:bg-gray-200">
              Buat Account
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>*/}
          </div>
        </div>
        <div style={{ backgroundColor: "rgb(165,207,76)", height: "6px" }}></div>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-50 flex flex-col`}>
        <div className="bg-[rgb(10,97,96)] flex items-center justify-center mx-2 mt-2 p-6 rounded-md">
          <Image src="/logo/logo.png" width={120} height={80} alt="Sidebar Logo" />
        </div>
        <div className="absolute top-4 right-4">
          <button className="text-white" onClick={() => setMenuOpen(false)}>
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>
        <div className="mt-auto flex flex-col items-center gap-4 pb-10">
            {/*          <Link href="/register" className="w-4/5 text-center py-2 bg-[rgb(10,97,96)] text-white rounded-md">
            Buat Account
          </Link> */}
          <Link href="/login" className="w-4/5 text-center py-2 text-gray-800 bg-gray-300 rounded-md">
            Login
          </Link>
        </div>
      </div>
      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>}

      {/* Wrapper Tengah */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center text-center px-6 py-10 md:w-3/5 md:px-20 mt-20">
          <Image src="/logo/console.png" width={300} height={200} alt="Body Image" />
          <p className="text-xl text-gray-800 md:text-3xl md:leading-normal mt-8">
            <strong>Selamat Datang Di Tarakh Store!</strong>
          </p>
          <p className="text-10px text-gray-800 md:text-3xl md:leading-normal">
            Toko Top Up Game Terpercaya
          </p>

          {/* Container Game */}
          <div className="mt-6 bg-gray-200 p-6 shadow-lg rounded-lg mt-8 ">
            <div className="grid grid-cols-5 gap-4 justify-center">
              <Link href="/home/mobilelegends">
                <Image src="/game/ml.png" width={150} height={150} alt="Mobile Legends" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </Link>
              <div className="cursor-pointer" onClick={() => setIsPopupOpen(true)}>
                <Image src="/game/PUBG.jpg" width={150} height={150} alt="PUBG" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </div>
              {isPopupOpen && <PopupNo onClose={() => setIsPopupOpen(false)} />}
              <div className="cursor-pointer" onClick={() => setIsPopupOpen(true)}>
                <Image src="/game/FF.png" width={150} height={150} alt="PUBG" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </div>
              {isPopupOpen && <PopupNo onClose={() => setIsPopupOpen(false)} />}
              <div className="cursor-pointer" onClick={() => setIsPopupOpen(true)}>
                <Image src="/game/GI.jpg" width={150} height={150} alt="PUBG" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </div>
              {isPopupOpen && <PopupNo onClose={() => setIsPopupOpen(false)} />}
              <div className="cursor-pointer" onClick={() => setIsPopupOpen(true)}>
                <Image src="/game/valo.png" width={150} height={150} alt="PUBG" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </div>
              {isPopupOpen && <PopupNo onClose={() => setIsPopupOpen(false)} />}
              <div className="cursor-pointer" onClick={() => setIsPopupOpen(true)}>
                <Image src="/game/FRT.png" width={150} height={150} alt="PUBG" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </div>
              {isPopupOpen && <PopupNo onClose={() => setIsPopupOpen(false)} />}
              <div className="cursor-pointer" onClick={() => setIsPopupOpen(true)}>
                <Image src="/game/COD.jpg" width={150} height={150} alt="PUBG" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </div>
              {isPopupOpen && <PopupNo onClose={() => setIsPopupOpen(false)} />}
              <div className="cursor-pointer" onClick={() => setIsPopupOpen(true)}>
                <Image src="/game/ROE.jpg" width={150} height={150} alt="PUBG" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </div>
              {isPopupOpen && <PopupNo onClose={() => setIsPopupOpen(false)} />}
              <div className="cursor-pointer" onClick={() => setIsPopupOpen(true)}>
                <Image src="/game/COC.jpg" width={150} height={150} alt="PUBG" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </div>
              {isPopupOpen && <PopupNo onClose={() => setIsPopupOpen(false)} />}
              <div className="cursor-pointer" onClick={() => setIsPopupOpen(true)}>
                <Image src="/game/CR.png" width={150} height={150} alt="PUBG" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </div>
              {isPopupOpen && <PopupNo onClose={() => setIsPopupOpen(false)} />}


              {/*<Link href="/home3">
                <Image src="/game/FF.png" width={150} height={150} alt="Free Fire" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </Link>
              <Link href="/home4">
                <Image src="/game/GI.jpg" width={150} height={150} alt="Genshin Impact" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </Link>
              <Link href="/home5">
                <Image src="/game/valo.png" width={150} height={150} alt="Valorant" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </Link>
              <Link href="/home6">
                <Image src="/game/FRT.png" width={150} height={150} alt="Fortnite" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </Link>
              <Link href="/home7">
                <Image src="/game/COD.jpg" width={150} height={150} alt="Call of Duty" className="cursor-pointer rounded-md transition-transform transform hover:scale-110" />
              </Link>*/}
            </div>
          </div>

          <div className="mt-6 bg-gray-200 p-6 shadow-lg rounded-lg mt-8">
            <div className="grid grid-1 gap-4 justify-center">
              <p>Kelompok 2</p>
              <p>Mahfud Muhyiddin</p>
              <p>Rian Wibowo</p>
              <p>Raihan Fajarahmatan</p>
              <p>Muhammad Amar</p>
              <p>Mochammad Shohibul Burhan</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
