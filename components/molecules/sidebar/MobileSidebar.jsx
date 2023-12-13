"use client";

import { useState, useEffect } from "react";

// components
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "@/components/molecules";
// icons
import { Menu } from "lucide-react";

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  const handleMount = (mountState) => {
    setIsMounted(mountState);
  };

  useEffect(() => {
    handleMount(true);
  }, []);

  if (!isMounted) {
    // this is required to get rid of hydration error
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 ">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
