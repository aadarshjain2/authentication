import Header from "@/components/layout/dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 h-screen">
      
      <div className="w-3xs bg-gray-300 pt-4">
        sidebar
      </div>

      <div className="w-full px-4 pt-4">
        <Header />

        <div>
          {children}
        </div>
      </div>

    </div>
  );
}