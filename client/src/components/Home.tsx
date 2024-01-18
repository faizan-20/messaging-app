import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await axios.get("/users");
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };
    checkUser();
  });

  return <div className="bg-gray-800 h-screen">Home</div>;
}
