"use client";

import { useEffect, useState } from "react";
import { ProModal } from "@/components/molecules/modals";
// components

export const CustomModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProModal />
    </>
  );
};
