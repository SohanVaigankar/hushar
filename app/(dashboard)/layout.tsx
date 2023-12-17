// components
import { Navbar, Sidebar } from "@/components/molecules";

// api
import { checkSubscription, getApiLimitCount } from "@/lib/apiMethods";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const getApiLimitCountRes = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar freeTrialData={{ count: getApiLimitCountRes }} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
