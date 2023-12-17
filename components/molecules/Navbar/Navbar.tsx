import { UserButton } from "@clerk/nextjs";
// components
import { MobileSidebar } from "@/components/molecules";
// api
import { checkSubscription, getApiLimitCount } from "@/lib/apiMethods";

export const Navbar = async () => {
  const getApiLimitCountRes = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <div className="flex items center p-4  ">
      <MobileSidebar apiLimitCount={getApiLimitCountRes} isPro={isPro} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
