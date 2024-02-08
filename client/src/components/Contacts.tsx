import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import AddUser from "./AddUser";
import ContactCard, { User } from "./ContactCard";
import { useContext, useState } from "react";
import { ChatContext } from "@/context/ChatProvider";

type UserProps = {
  user: User;
};

export default function Contacts({ user }: UserProps) {
  const { chat } = useContext(ChatContext);
  const [selectedChat, setSelectedChat] = useState("");

  return (
    <>
      <div className="w-1/3">
        <div className="bg-stone-950 h-[12%] flex px-4 py-2 items-center border-2 border-slate-700 justify-around">
          <div className="h-16 w-auto">
            <Avatar>
              <AvatarImage
                src={user.avatar}
                className="object-cover rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="mx-6 font-bold text-xl">{user.fullName}</div>
          <AddUser />
        </div>
        <div className="bg-gray-800 h-[88%] pl-2">
          {chat ? (
            <div>
              {chat.map((c) => (
                <div key={c._id}>
                  <ContactCard
                    usr={c.users[0]?._id === user._id ? c.users[1] : c.users[0]}
                    latestMessage={c.latestMessage}
                    chatId={c._id}
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>loading</div>
          )}
        </div>
      </div>
    </>
  );
}
