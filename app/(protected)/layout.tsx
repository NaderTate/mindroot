"use client";
import { Sidebar } from "@/components/sidebar";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@nextui-org/react";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar((state) => state);

  return (
    <div className="flex">
      <Sidebar />
      <div
        className={cn(
          "p-10 transition-all duration-300",
          collapsed ? "ml-0" : "sm:ml-60"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default ProtectedLayout;
