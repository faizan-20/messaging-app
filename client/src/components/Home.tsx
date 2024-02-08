import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "./Contacts";
import Chat from "./Chat";
import { ChatContext, ChatType } from "@/context/ChatProvider";
import { User } from "./ContactCard";

export default function Home() {
  const [user, setUser] = useState<User>();

  const navigate = useNavigate();

  const { setChat } = useContext(ChatContext);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get<ChatType[]>("/chat");
        setChat(data);
      } catch (error) {
        console.error("error while fetching chats: ", error);
      }
    };
    fetchChats();
  }, [setChat, user?._id]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axios.get("/users");
        setUser(data);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="bg-gray-900 h-screen flex text-slate-200">
      {user ? <Contacts user={user} /> : <div>getting user</div>}
      <Chat />
    </div>
  );
}
