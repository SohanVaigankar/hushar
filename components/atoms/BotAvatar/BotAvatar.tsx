import { Avatar, AvatarImage } from "@/components/ui";

export const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1" src="/assets/logo.png" />
    </Avatar>
  );
};
