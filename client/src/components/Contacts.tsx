import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";

type UserProps = {
  user: {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    avatar: string;
  };
};

export default function Contacts({ user }: UserProps) {
  return (
    <>
      <div className="w-1/3">
        <div className="bg-stone-950 h-[12%] flex px-4 py-2 items-center border-2 border-slate-700">
          <div className="h-16 w-auto">
            <Avatar>
              <AvatarImage
                src={user.avatar}
                className="object-cover rounded-[50%] align-middle"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="mx-6 font-bold text-xl">{user.fullName}</div>
        </div>
        <div className="bg-gray-800 h-[88%]">Contacts</div>
      </div>
    </>
  );
}
