import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("/users/login", {
        username,
        password,
      });
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("/users");
        navigate("/home");
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <>
      <div className="bg-gray-800 h-screen flex justify-center items-center text-slate-100">
        <div className="border-slate-600 border-2 rounded-md flex flex-col items-center p-8">
          <div className="my-2 font-bold text-3xl">Login</div>
          <div>
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="username"
                name="username"
                type="text"
                value={username}
                onChange={handleChange}
                className="border-slate-600 my-2"
              />
              <Input
                placeholder="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                className="border-slate-600 my-2"
              />
              <div className="flex justify-between">
                <Button>Submit</Button>
                <Link className="text-indigo-900" to="/register">
                  Register?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
