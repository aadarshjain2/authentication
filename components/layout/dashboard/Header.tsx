"use client";

import LogoutButton from "@/components/common/Logout";
import { Home, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-2">

      <div className="flex items-center gap-3">

        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard
          </h1>

          {/* Hide subtitle on mobile */}
          <p className="hidden sm:block text-gray-600 dark:text-gray-400 mt-1 text-sm">
            Welcome back to your dashboard
          </p>
        </div>

      </div>

    
      <div className="flex items-center gap-2 sm:gap-4">

        
        <Link href="/">
          <button className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Home className="h-4 w-4" />
          </button>
        </Link>

       
        <button
          onClick={() => router.push("/dashboard/profile")}
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <User className="h-4 w-4" />
        </button>

       
        <LogoutButton className="hidden sm:block bg-gray-800 rounded-xl text-white px-4 py-2 text-sm" />

      </div>
    </div>
  );
};

export default Header;