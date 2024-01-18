import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "./Contacts";
import Chat from "./Chat";

export default function Home() {
  const [user, setUser] = useState({
    _id: "",
    fullName: "",
    username: "",
    email: "",
    avatar: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axios.get("/users");
        setUser(data);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="bg-gray-900 h-screen flex text-slate-200">
      <Contacts user={user} />
      <Chat />
    </div>
  );
}
