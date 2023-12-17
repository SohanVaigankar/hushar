interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout = (props: LandingLayoutProps) => {
  const { children } = props;
  return (
    <main className="h-full bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
    </main>
  );
};

export default LandingLayout;
