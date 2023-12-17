"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// icons
import { Zap } from "lucide-react";
// components
import { Button } from "@/components/ui";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = (props: SubscriptionButtonProps) => {
  const { isPro = false } = props;
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");
      window.location.href = res?.data?.url;
    } catch (error: any) {
      console.error("BILLING_ERROR", error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      variant={isPro ? "default" : "premium"}
      onClick={handleClick}
    >
      {isPro ? "Manage Subcription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
