import { Avatar, Button } from "@nextui-org/react";

type UserCardProps = { name: string; email: string; image?: string };

export const UserCard = ({ name, email, image }: UserCardProps) => {
  return (
    <Button
      fullWidth
      variant="light"
      className="flex gap-2 items-center justify-start text-left"
    >
      <Avatar showFallback name={name} src={image} />
      <div>
        <h3 className="font-semibold">{name}</h3>
        <h4 className="text-sm">{email}</h4>
      </div>
    </Button>
  );
};
