"use client";

import { useRouter } from "next/navigation";

// icons
import { ArrowRight, LucideIcon } from "lucide-react";

// components
import { Card } from "@/components/ui";

// utils
import { cn } from "@/lib/utils";
import { TOOLS } from "@/lib/constants";

type toolType = {
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  path: string;
};

const DashboardPage = () => {
  const router = useRouter();

  const handleClick = (data: toolType): void => {
    router.push(data?.path);
  };

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore The Power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {TOOLS?.map((tool) => (
          <Card
            key={tool?.path}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            onClick={() => handleClick(tool)}
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool?.bgColor)}>
                {tool?.icon && (
                  <tool.icon className={cn("w-8 h-8", tool?.color)} />
                )}
              </div>
              <div className="font-semibold">{tool?.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
