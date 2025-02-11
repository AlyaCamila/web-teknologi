import Link from "next/link";
import NavLinks from "@/app/ui/admin/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-16 md:h-40 items-center justify-center rounded-md p-4"
        href="/"
        style={{ backgroundColor: "rgb(10,97,96)" }} // Warna background
      >
        <div className="flex justify-center items-center">
          <img
            src="/logo/logo.png"
            className="max-w-[60px] md:max-w-[120px] h-[40px] md:h-auto object-contain" // Ukuran lebih kecil di mobile
            alt="Banner UIA"
          />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={async () => { "use server"; await signOut(); }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
