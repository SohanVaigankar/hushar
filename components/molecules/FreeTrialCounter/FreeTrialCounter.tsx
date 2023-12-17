"use client";

import { Button, Card, CardContent, Progress } from "@/components/ui";
// components
import { useState, useEffect } from "react";
// icons
import { Zap } from "lucide-react";
// hooks
import { useModal } from "@/hooks";
// utils
import { MAX_LIMIT } from "@/lib/constants";

interface FreeTrailCounterProps {
  count: number;
  isPro: boolean;
}

export const FreeTrialCounter = (props: FreeTrailCounterProps) => {
  const { count, isPro = false } = props;
  const modal = useModal();

  const [mounted, setMounted] = useState(false);

  const handleClick = () => {
    modal.onOpen();
  };

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return null;
  }
  if (isPro) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>{`${count} / ${MAX_LIMIT} Free Generations`}</p>
            <Progress className="h-3" value={(count / MAX_LIMIT) * 100} />
          </div>
          <Button onClick={handleClick} className="w-full" variant="premium">
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
