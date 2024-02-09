import { useContext, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SelectedChatContext } from "@/context/SelectedChatProvider";
import axios from "axios";

export default function Chat() {
  const { selectedChat } = useContext(SelectedChatContext);

  const sendHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const getChat = async () => {
      try {
        if (selectedChat) {
          const { data } = await axios.get(`/message/${selectedChat}`);
          console.log(data);
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
        <div>chat content</div>
        <form className="flex p-3" onSubmit={sendHandler}>
          <Input
            type="text"
            name="send-message"
            required
            autoComplete="off"
            placeholder="Type Message Here"
            className="bg-slate-200 text-slate-950 focus:border-primary border-2 border-slate-900 h-10"
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
