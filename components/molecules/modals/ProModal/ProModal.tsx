"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
// icons
import { Check, Zap } from "lucide-react";

// components
import {
  Badge,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";

// hooks
import { useModal } from "@/hooks";

// utils & constants
import { TOOLS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const ProModal = () => {
  const modal = useModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");
      window.location.href = res?.data?.url;
    } catch (error: any) {
      console.error(error, "STRIPE_CLIENT_ERROR");
        toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1 ">
              Upgrade to Hushar
              <Badge className="uppercase text-sm py-1" variant="premium">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {TOOLS?.map((tool) => (
              <Card
                key={tool?.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4 ">
                  <div className={cn("p-2 w-fit rounded-md", tool?.bgColor)}>
                    {tool?.icon && (
                      <tool.icon className={cn("w-6 h-6", tool?.color)} />
                    )}
                  </div>
                  <div className="font-semibold text-sm">{tool?.label}</div>
                </div>
                <Check className="text-primary w-5 h-5 " />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade <Zap className="w-4 h-4 fill-white ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
