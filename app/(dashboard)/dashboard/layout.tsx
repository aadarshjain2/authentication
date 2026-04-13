"use client";

import { useState } from "react";
import Header from "@/components/layout/dashboard/Header";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">

      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

     
      <div
        className={`
        fixed lg:static z-50 top-0 left-0 h-full
        w-64 bg-white shadow-xl
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        `}
      >
        <div className="p-4 text-md md:text-3xl font-bold border-b py-8">
          Sidebar
        </div>

        <nav className="p-4 space-y-2">
          <a className="block p-2 rounded hover:bg-gray-100">Dashboard</a>
          <a className="block p-2 rounded hover:bg-gray-100">Users</a>
          <a className="block p-2 rounded hover:bg-gray-100">Settings</a>
        </nav>
      </div>

      
      <div className="flex flex-col flex-1 overflow-hidden">

       
        <div className="flex items-center gap-3 p-4 border-b bg-white">

          
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded hover:bg-gray-100"
          >
            ☰
          </button>

          <div className="flex-1">
            <Header />
          </div>

        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>

      </div>
    </div>
  );
}