"use client";

import { useState } from "react";
import { ArrowRightIcon, LockClosedIcon, Bars3Icon, XMarkIcon, PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedItem, setSelectedItem] = useState<{ id: number; price: number; label: string } | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [customerName, setCustomerName] = useState("");

    const increaseQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
    const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

    const items = [
        { id: 1, price: 600000, label: "kapasitas 4 orang" },
        { id: 2, price: 650000, label: "kapasitas 8 orang" },
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
            label: selectedItem?.label,  
            lama_sewa: quantity,         
            total_harga: quantity * (selectedItem?.price || 0), 
        };
        
        try {
            const response = await fetch("/api/transaksi", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transactionData),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Transaksi berhasil, pesanan kamu akan segera diproses.");
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
        <main className="flex flex-col items-center min-h-screen bg-[rgb(254,254,254)] md:mt-12 mx-4 md:mx-12">
            {/* 🔹 Header */}
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

            {/* 🔹 Bagian Kiri (Gambar Avanza) */}
            <div className="w-full md:w-1/3 flex justify-center md:fixed md:left-0 md:top-0 md:h-screen md:items-center mb-6 md:mb-0">
                <Image
                    src="/mobil/avanza.png"
                    width={400}
                    height={250}
                    alt="Mobil Avanza"
                    className="rounded-lg transition-transform transform hover:scale-105"
                />
            </div>

        {/* 🔹 Bagian Kanan (Konten yang Bisa di-Scroll) */}
        <div className="w-full md:w-2/3 ml-auto overflow-y-auto h-screen px-6 py-6 md:py-12">
            {/* 🔹 Container Keterangan */}
            <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
                <div className="bg-blue-800 text-white text-start py-3 rounded-t-lg px-4">
                    <h2 className="text-md font-semibold">Keterangan</h2>
                </div>
                <div className="p-4 text-gray-700">
                    <p><strong>Jenis Mobil:</strong> Avanza</p>
                    <p><strong>Bagasi:</strong> 1</p>
                    <p><strong>Bahan Bakar:</strong> Bensin</p>
                    <p><strong>Asuransi:</strong> Yes</p>
                    <p><strong>Kapasitas:</strong> {selectedItem ? selectedItem.label : "Belum dipilih"}</p>
                    <p><strong>Harga Sewa per Hari:</strong> {selectedItem ? `Rp. ${selectedItem.price.toLocaleString()}` : "Belum dipilih"}</p>

                    {/* Pilihan Kapasitas */}
                    <div className="mt-4 flex gap-4">
                        {items.map((item) => (
                            <button
                                key={item.id}
                                className={`p-4 w-full text-center rounded-lg border-2 transition ${
                                    selectedItem?.id === item.id ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"
                                }`}
                                onClick={() => setSelectedItem(item)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

                {/* 🔹 Input Nama */}
                <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
                    <div className="bg-blue-800 text-white text-center py-3 rounded-t-lg">
                        <h2 className="text-ms font-semibold">Masukkan Nama Anda</h2>
                    </div>
                    <div className="p-6">
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-md text-md"
                            placeholder="Masukan Nama"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>
                </div>

                {/* 🔹 Input Jumlah */}
                <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
                    <div className="bg-blue-800 text-white text-center py-3 rounded-t-lg">
                        <h2 className="text-ms font-semibold">Lama Sewa </h2>
                    </div>
                    <div className="p-6 flex items-center gap-4">
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

                {/* 🔹 Lanjutkan Pembayaran */}
                <div className="bg-white shadow-lg rounded-lg p-4 mb-12">
                    <div className="bg-blue-800 text-white text-center py-3 rounded-t-lg">
                        <h2 className="text-ms font-semibold">Lanjutkan Pembayaran</h2>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                        <div className="flex justify-between text-gray-700 text-md">
                            <span>Lama Sewa:</span>
                            <span>{quantity}x {selectedItem?.label || "Belum dipilih"}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 text-md font-semibold">
                            <span>Total Harga:</span>
                            <span>Rp. {quantity * (selectedItem?.price || 0)}</span>
                        </div>
                        <button 
                            onClick={handleLanjutkanPembayaran}
                            className="w-full bg-gray-500 text-white py-3 rounded-md font-semibold hover:bg-blue-300 transition"
                        >
                            Lanjutkan Pembayaran
                        </button>
                    </div>
                </div>

                {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                        <h2 className="text-lg font-semibold mb-4">Lanjutkan Pembayaran?</h2>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Tidak
                            </button>
                            <button
                                onClick={handleKonfirmasiPembayaran}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Ya
                            </button>
                        </div>
                    </div>
                </div>
            )}

            </div>
        </main>
    );
}