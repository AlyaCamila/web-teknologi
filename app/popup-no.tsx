"use client";

import { useEffect, useState } from "react";

export default function PopupNo({ onClose }: { onClose: () => void }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setIsPopupOpen(true); // Langsung munculkan pop-up saat halaman dimuat
  }, []);

  if (!isPopupOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 z-50 flex justify-center items-center">
      <div className="bg-white rounded-md p-6 w-11/12 md:w-1/3 text-center shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-lg text-gray-800 mb-4">
          Mohon maaf, fitur ini sedang dalam perbaikan
        </p>
        <button
          onClick={() => {
            setIsPopupOpen(false);
            onClose();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
