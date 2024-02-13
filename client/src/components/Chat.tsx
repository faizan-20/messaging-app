import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SelectedChatContext } from "@/context/SelectedChatProvider";
import axios from "axios";
import { User } from "./ContactCard";
import { ChatType } from "@/context/ChatProvider";
import { UserProps } from "./Contacts";

export type MessageType = {
  _id: string;
  sender: User;
  content: string;
  chat: ChatType;
  users: User[];
};

export default function Chat({ user }: UserProps) {
  const { selectedChat } = useContext(SelectedChatContext);
  const [messages, setMessages] = useState<MessageType[]>();

  const [content, setContent] = useState("");

  const sendHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post("/message", {
      content,
      chatId: selectedChat,
    });
    setContent("");
    if (messages) {
      setMessages([...messages, data]);
    } else {
      setMessages([data]);
    }
  };

  useEffect(() => {
    const getChat = async () => {
      try {
        if (selectedChat) {
          const { data } = await axios.get<MessageType[]>(
            `/message/${selectedChat}`,
          );
          setMessages(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getChat();
  }, [selectedChat]);

  if (selectedChat) {
    return (
      <div className="flex flex-col justify-end h-screen">
        <div className="h-screen overflow-auto flex flex-col justify-end">
          {messages && messages.length > 0 ? (
            <>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`${msg.sender._id === user._id ? "self-end bg-blue-600" : "self-start bg-green-600"} px-3 py-1 rounded-sm mx-4 my-1`}
                >
                  {msg.content}
                </div>
              ))}
            </>
          ) : (
            <div>Say Hello</div>
          )}
        </div>
        <form className="flex p-3" onSubmit={sendHandler}>
          <Input
            type="textbox"
            name="send-message"
            required
            autoComplete="off"
            placeholder="Type Message Here"
            className="bg-slate-200 text-slate-950 focus:border-primary border-2 border-slate-900 h-10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button className="ml-2 h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="text-slate-400 flex justify-center h-screen items-center text-2xl">
      <div>Click on a user to start chatting</div>
    </div>
  );
}
