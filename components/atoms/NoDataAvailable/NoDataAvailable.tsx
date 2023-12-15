import Image from "next/image";

interface NodataAvailableProps {
  label: string;
}

export const NoDataAvailable = (props: NodataAvailableProps) => {
  const { label } = props;
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image
          alt="no data available"
          fill
          src="/assets/no_data_available.png"
        />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};
