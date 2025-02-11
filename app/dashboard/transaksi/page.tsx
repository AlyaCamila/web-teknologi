"use client";

import { useEffect, useState } from "react";

interface Transaksi {
  id: number;
  customer_name: string;
  item_id: string;
  quantity: number;
  total_price: number;
  created_at: string;
}

export default function TransaksiPage() {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false); // Awalnya hanya tampilkan 5 data

  useEffect(() => {
    async function fetchTransaksi() {
      try {
        const response = await fetch("/api/transaksi");
        if (!response.ok) {
          throw new Error("Gagal mengambil data transaksi");
        }
        const data: Transaksi[] = await response.json();
        setTransaksi(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransaksi();

    // Deteksi ukuran layar
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data Transaksi</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Nama Pelanggan</th>
                <th className="border border-gray-300 px-4 py-2">Item</th>
                <th className="border border-gray-300 px-4 py-2">Jumlah</th>
                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Total Harga</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {(isMobile && !showAll ? transaksi.slice(0, 5) : transaksi).map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.customer_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.item_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">Rp {item.total_price.toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(item.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tombol Load More hanya muncul di mode mobile */}
          {isMobile && !showAll && transaksi.length > 5 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAll(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Tampilkan Lebih Banyak
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
