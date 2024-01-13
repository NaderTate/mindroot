"use client";

import Link from "next/link";
import { Link as NUILink, cn } from "@nextui-org/react";

import { sidebarData } from "./data";

import { useSidebar } from "@/store/use-sidebar";
import Toggle from "./Toggle";
import Logo from "../Logo";

type SidebarProps = {};

export const Sidebar = ({}: SidebarProps) => {
  const { collapsed } = useSidebar((state) => state);
  return (
    <aside
      className={cn(
        "w-60 bg-default-900 h-screen fixed space-y-2 transition-transform duration-300 z-50",
        collapsed && "-translate-x-60"
      )}
    >
      <div className="overflow-auto h-full p-10">
        <Logo className="mb-2" />
        {sidebarData.map((item) => (
          <div key={item.parent.link}>
            <div className={`flex items-center gap-x-2 ${item.parent.color}`}>
              <item.parent.icon />
              {item.parent.link ? (
                <NUILink
                  href={item.parent.link}
                  as={Link}
                  className={`${item.parent.color} `}
                >
                  <h1 className="text-lg">{item.parent.label}</h1>
                </NUILink>
              ) : (
                <h1 className="text-lg">{item.parent.label}</h1>
              )}
            </div>
            {item.children?.map((child) => (
              <NUILink
                key={child.link}
                as={Link}
                href={child.link}
                className="text-sm block ml-6 text-default-50 my-1 tracking-wide "
              >
                {child.label}
              </NUILink>
            ))}
          </div>
        ))}
      </div>
      <Toggle />
    </aside>
  );
};
