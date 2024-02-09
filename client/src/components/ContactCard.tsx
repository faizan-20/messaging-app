import { LatestMessage } from "@/context/ChatProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dispatch, SetStateAction } from "react";
export type User = {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
};

type ContactCardProps = {
  usr: User;
  latestMessage?: LatestMessage;
  chatId: string;
  selectedChat: string;
  setSelectedChat: Dispatch<SetStateAction<string>>;
};

export default function ContactCard({
  usr,
  latestMessage,
  chatId,
  selectedChat,
  setSelectedChat,
}: ContactCardProps) {
  return (
    <div
      className={`flex items-center px-4 py-4 cursor-pointer transition-all border-l-2 rounded-l-full border-gray-800 hover:bg-slate-700 ${selectedChat === chatId ? "bg-gray-900" : "bg-gray-800"}`}
      onClick={() => {
        setSelectedChat(chatId);
      }}
    >
      <div className="h-12 w-12">
        <Avatar className="">
          <AvatarImage
            src={usr?.avatar}
            className="rounded-full object-cover"
            alt={`${usr?.fullName}'s Avatar`}
          />
          <AvatarFallback className="bg-gray-300 text-gray-500 rounded-full">
            {usr?.fullName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="ml-4">
        <div className="font-bold text-lg">{usr?.fullName}</div>
        <div>
          {latestMessage && (
            <div className="text-sm">
              <span className="font-bold">
                {latestMessage.sender?.username || "Unknown"}
              </span>
              : {latestMessage.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
