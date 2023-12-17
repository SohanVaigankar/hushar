"use client";

import { useState, useEffect } from "react";

// icons
import { Menu } from "lucide-react";
// components
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui";
import { Sidebar } from "@/components/molecules";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

export const MobileSidebar = (props: MobileSidebarProps) => {
  const { apiLimitCount, isPro = false } = props;
  const [isMounted, setIsMounted] = useState(false);
  const [freeTrialData, setFreeTrialData] = useState({
    count: apiLimitCount || 0,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // this is required to get rid of hydration error
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 ">
        <Sidebar freeTrialData={freeTrialData} isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};
