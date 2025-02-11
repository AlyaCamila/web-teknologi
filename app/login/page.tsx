'use client'; //pengunaan useactionstate harus mencantumkan ini

import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '../lib/actions'; //autentikasi

export default function Page() {
    const [errorMessage, formAction, isPending]= useActionState(
        authenticate,
        undefined,
    );
    return (
        //baris kode header
    <main className="flex min-h-screen flex-col p-6">
        {/* Header */}
        <div className="fixed top-0 left-0 w-full z-50">
            <div style={{ backgroundColor: "rgb(10,97,96)" }} className="flex items-center justify-between px-6 md:px-12 py-4">
                <Image src="/logo/logo.PNG" width={100} height={70} className="w-20 md:w-20 lg:w-20 h-auto transition-all duration-300" alt="logo" />
            </div>
            <div style={{ backgroundColor: "rgb(165,207,76)", height: "6px" }}></div>
        </div>

            {/*baris kode form login*/}
            <div className="flex flex-col justify-center gap-6 px-6 py-10 md m-auto">
                <form action={formAction} className="space-y-3">
                    <div className="flex-1 px-6 pb-4 pt-8">
                        <strong className={`text-gray-800 mb-3 text-2xl`}>
                            HARAP MASUKAN AKUN ANDA
                        </strong>
                        <div className="w-full">
                            <div>
                                <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="email">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Ketikkan alamat email"
                                    required
                                />
                                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray"></AtSymbolIcon>
                    </div>
                    </div>
                    <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="password"
                    >
                                Kata Sandi
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Ketikkan Kata Sandi"
                                    required
                                    minLength={6}   
                    />
                                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus: text-gray-900"></KeyIcon>
                            </div>
                        </div>
                    </div>
                    <Button className="mt-4 w-full" aria-disabled={isPending}>
                    Masuk <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                    </Button>
                    {/*}
                    <a href="/register" className="text-gray-800 transition-colors duration-300 hover:text-blue-500 md:text-base">
                     belum punya akun?
                    </a>
                    */}
                    <div className="flex h 8 items end space-x-1">

                        {errorMessage && (
                            <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{errorMessage}</p>
                            </>
                        )}
                    </div>
            </div>
        </form>
        </div>
</main >

    );
}