// icons
import { Settings as SettingsIcon } from "lucide-react";
// components
import { Heading } from "@/components/atoms";
import { SubscriptionButton } from "@/components/molecules";
// api
import { checkSubscription } from "@/lib/apiMethods";

const Settings = async () => {
  const isPro = await checkSubscription();
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage accoount settings."
        icon={SettingsIcon}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "Ypu're currently on a Pro Plan"
            : "You're currently on a Free Plan"}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default Settings;
