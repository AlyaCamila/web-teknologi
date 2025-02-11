'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AtSymbolIcon, KeyIcon, FaceSmileIcon } from '@heroicons/react/24/outline'; // Impor FaceSmileIcon
import { Button } from '@/app/ui/button';

export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registrasi Berhasil! Silakan login.');
                router.push('/login'); // Redirect ke halaman login
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage('Terjadi kesalahan, coba lagi nanti.');
        }
    };

    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="fixed top-0 left-0 w-full z-50">
                <div style={{ backgroundColor: "rgb(10,97,96)" }} className="flex h-24 items-center px-6 md:px-12">
                    <Image src="/logo/logo.png" width={150} height={100} className="hidden md:block" alt="Logo" />
                </div>
                <div style={{ backgroundColor: "rgb(165,207,76)", height: "6px" }}></div>
            </div>

            <div className="flex flex-col justify-center gap-6 px-6 py-10 md:w-2/5 md:px-20 m-auto">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex-1 px-6 pb-4 pt-8">
                        <strong className="text-gray-800 mb-3 text-2xl">DAFTAR KAN AKUN ANDA</strong>
                        <div>
                            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="name">Nama :</label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Masukkan Nama Anda"
                                    required
                                />
                                <FaceSmileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray" />
                            </div>
                        </div>

                        <div>
                            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">Email :</label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Masukkan Email Anda"
                                    required
                                />
                                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray" />
                            </div>
                        </div>

                        <div>
                            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">Password :</label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan Password Anda"
                                    required
                                    minLength={6}
                                />
                                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                        </div>

                        <Button type="submit" className="mt-4 w-full">Daftar</Button>

                        {errorMessage && (
                            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
                        )}
                    </div>
                </form>
            </div>
        </main>
    );
}
