"use client";

import { useState } from "react";
import { ArrowRightIcon, LockClosedIcon, Bars3Icon, XMarkIcon, PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedItem, setSelectedItem] = useState<{ id: number; price: number; label: string } | null>(null);
    const increaseQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
    const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));
    const [showPopup, setShowPopup] = useState(false);
    const [customerName, setCustomerName] = useState("");

    const items = [
        { id: 1, price: 30000, label: "100 + 10 Diamonds" },
        { id: 2, price: 60000, label: "200 + 20 Diamonds" },
        { id: 3, price: 90000, label: "300 + 30 Diamonds" },
        { id: 4, price: 120000, label: "400 + 40 Diamonds" },
        { id: 5, price: 150000, label: "500 + 50 Diamonds" },
        { id: 6, price: 180000, label: "600 + 60 Diamonds" },
        { id: 7, price: 210000, label: "700 + 70 Diamonds" },
        { id: 8, price: 240000, label: "800 + 80 Diamonds" },
        { id: 9, price: 270000, label: "900 + 90 Diamonds" },
    ];

    const handleSelectItem = (item: { id: number; price: number; label: string }) => {
        setSelectedItem(item);
    };

    const handleLanjutkanPembayaran = () => {
        if (!selectedItem) {
            alert("Silakan pilih item terlebih dahulu!");
            return;
        }
        setShowPopup(true);
    };

    const handleKonfirmasiPembayaran = async () => {
        if (!customerName.trim()) {
            alert("Silakan masukkan nama Anda!");
            return;
        }
    
        const transactionData = {
            customer_name: customerName,
            item_id: selectedItem?.id,
            quantity: quantity,
            total_price: quantity * (selectedItem?.price || 0),
        };
        
    
        try {
            const response = await fetch("/api/transaksi", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transactionData),
            });
    
            const result = await response.json();
            if (response.ok) {
                alert("Transaksi berhasil, pesanan kamu akan segera di proses");
            } else {
                alert("Gagal menyimpan transaksi: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat memproses transaksi.");
        }
    
        setShowPopup(false);
    };
    
    
    return (
        <main className="flex flex-col items-center min-h-screen bg-[rgb(232,246,244)]">
            {/* 🔹 Header */}
            <div className="fixed top-0 left-0 w-full z-50">
                <div style={{ backgroundColor: "rgb(10,97,96)" }} className="flex items-center justify-between px-4 md:px-12 py-5 md:py-6 h-24 md:h-28 transition-all duration-300">
                    <Image src="/logo/logo.PNG" width={80} height={50} className="w-14 md:w-16 lg:w-18 h-auto object-contain transition-all duration-300" alt="logo" />
                    <button className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
                        <Bars3Icon className="w-6 h-6 md:w-7 md:h-7" />
                    </button>
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="flex items-center gap-2 text-white text-sm md:text-base font-medium transition hover:text-gray-300">
                            <LockClosedIcon className="w-5 h-5" />
                            Login
                        </Link>
                    </div>
                </div>
                <div style={{ backgroundColor: "rgb(165,207,76)", height: "6px" }}></div>
            </div>

            {/* 🔹 Sidebar */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>
            )}
            <aside className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-50 flex flex-col`}> 
                <div className="bg-[rgb(10,97,96)] flex items-center justify-center mx-2 mt-2 p-6 rounded-md">
                    <Image src="/logo/logo.png" width={120} height={80} alt="Sidebar Logo" />
                </div>
                <button className="absolute top-4 right-4 text-gray-800" onClick={() => setMenuOpen(false)}>
                    <XMarkIcon className="w-7 h-7" />
                </button>
                <div className="mt-auto flex flex-col items-center gap-2 pb-10">
                    {/*}
                    <Link href="/register" className="w-4/5 text-center py-2 bg-[rgb(10,97,96)] text-white rounded-md">
                        Buat Account
                    </Link>
                    */}
                    <Link href="/login" className="w-4/5 text-center py-2 text-gray-800 bg-gray-300 rounded-md">
                        Login
                    </Link>
                </div>
            </aside>

            {/* 🔹 Banner */}
            <section className="relative w-full h-[50vh] md:h-[65vh] bg-[url('/banner/mlbanner.jpg')] bg-cover bg-center bg-no-repeat mt-[100px] md:mt-[110px] flex flex-col justify-end items-start pt-10 px-6 md:px-10 bg-black bg-opacity-70 text-left">
                <Image src="/game/ml.png" width={120} height={120} className="w-24 md:w-40 h-auto mb-2 rounded-md mt-4 md:mt-6 transition-all duration-300" alt="ML Icon" />
                <h1 className="text-xl md:text-5xl font-bold text-white">MOBILE LEGENDS: BANG BANG</h1>
                <p className="text-xs md:text-lg text-gray-300 mb-6">MOONTON</p>
            </section>


            {/* 🔹 Content */}
            <section className="flex flex-col md:flex-row justify-center py-6 w-full gap-8 px-4">
            <div className="bg-white shadow-lg rounded-lg w-full md:max-w-xs">
                <div className="bg-[rgb(10,97,96)] text-white text-center py-3 rounded-t-lg">
                    <h2 className="text-md font-semibold">Catatan</h2>
                </div>
                <div className="p-6">
                    <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                        <li>Pastikan ID dan Server sudah benar sebelum membeli.</li>
                        <li>Diamonds akan masuk dalam 1-5 menit setelah pembayaran.</li>
                        <li>Jika terjadi kendala, hubungi CS melalui live chat.</li>
                        <li>Harga dapat berubah sewaktu-waktu tanpa pemberitahuan.</li>
                    </ul>
                </div>
            </div>

                <div className="bg-white shadow-lg rounded-lg w-full md:max-w-2xl">
                    <div className="bg-[rgb(10,97,96)] text-white text-center py-3 rounded-t-lg">
                        <h2 className="text-md font-semibold">Pilih Diamond</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleSelectItem(item)}
                                    className={`cursor-pointer bg-gray-100 shadow-sm rounded-md p-3 text-center ${
                                        selectedItem?.id === item.id ? "border-2 border-green-500 bg-green-100" : ""
                                    }`}
                                >
                                    <h3 className="text-xs font-semibold text-gray-700">{item.label}</h3>
                                    <p className="text-[10px] text-gray-700 font-medium">Rp. {item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex flex-col md:flex-row justify-center items-start gap-8 w-full px-4 mb-6">
                <div className="hidden md:block bg-transparent rounded-lg p-6 w-full md:max-w-xs"></div>
                <div className="bg-white shadow-lg rounded-lg w-full md:max-w-2xl">
                    {/* Header dengan background rgb(10,97,96) */}
                    <div className="bg-[rgb(10,97,96)] text-white text-center py-3 rounded-t-lg">
                        <h2 className="text-ms font-semibold">Masukkan Nama Anda</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-4">
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-md text-md"
                            placeholder="Masukan Nama"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                        </div>
                    </div>
                </div>
            </div>

            {/*container jumlah*/}
            <div className="flex flex-col md:flex-row justify-center items-start gap-8 w-full px-4 mb-6">
                <div className="hidden md:block bg-transparent rounded-lg p-6 w-full md:max-w-xs"></div>
                <div className="bg-white shadow-lg rounded-lg w-full md:max-w-2xl">
                    <div className="bg-[rgb(10,97,96)] text-white text-center py-3 rounded-t-lg">
                        <h2 className="text-ms font-semibold">Jumlah Pembelian</h2>
                    </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4">
                                <input
                                    type="text"
                                    className="w-full text-start p-2 border border-gray-300 rounded-md text-md"
                                    value={quantity}
                                    readOnly
                                />
                            <button onClick={increaseQuantity} className="p-2 bg-gray-200 rounded-md">
                                <PlusCircleIcon className="w-5 h-5 text-gray-800" />
                            </button>
                            <button onClick={decreaseQuantity} className="p-2 bg-gray-200 rounded-md">
                                <MinusCircleIcon className="w-5 h-5 text-gray-800" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 Lanjutkan Pembayaran */}
            <section className="flex flex-col md:flex-row justify-center items-start gap-8 w-full px-4 mb-12">
            <div className="hidden md:block bg-transparent rounded-lg p-6 w-full md:max-w-xs"></div>
                <div className="bg-white shadow-lg rounded-lg w-full md:max-w-2xl">
                    <div className="bg-[rgb(10,97,96)] text-white text-center py-3 rounded-t-lg">
                        <h2 className="text-ms font-semibold">Lanjutkan Pembayaran</h2>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                        <div className="flex justify-between text-gray-700 text-md">
                            <span>Jumlah Pembelian:</span>
                            <span>{quantity}x {selectedItem?.label || "Belum dipilih"}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 text-md font-semibold">
                            <span>Total Harga:</span>
                            <span>Rp. {quantity * (selectedItem?.price || 0)}</span>
                        </div>

                        <button onClick={handleLanjutkanPembayaran} className="w-full bg-gray-500 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition">
                            Lanjutkan Pembayaran
                        </button>
                    </div>
                </div>
            </section>

            {/* 🔹 Popup Konfirmasi */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <p>Apakah Anda ingin melanjutkan pembayaran?</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <button onClick={handleKonfirmasiPembayaran} className="px-4 py-2 bg-green-500 text-white rounded">Ya</button>
                        <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-red-500 text-white rounded">Tidak</button>
                    </div>
                    </div>
                </div>
                )}
        </main>
    );
}