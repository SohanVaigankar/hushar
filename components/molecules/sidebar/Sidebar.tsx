"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// icons & images
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";

// fonts
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    path: "/conversation",
    icon: MessageSquare,
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    path: "/image",
    icon: ImageIcon,
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    path: "/video",
    icon: VideoIcon,
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    path: "/music",
    icon: Music,
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    path: "/code",
    icon: Code,
    color: "text-blue-700",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    color: "text-gray-500",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="hushar" src="/assets/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Hushar
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route?.path}
              key={route?.path}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route?.path
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                {route?.icon && (
                  <route.icon className={cn("h-5 w-5 mr-3", route?.color)} />
                )}
                {route?.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
