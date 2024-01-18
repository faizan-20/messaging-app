import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Label } from "@radix-ui/react-label";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const navigate = useNavigate();
  const { toast } = useToast();

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
      toast({
        variant: "destructive",
        title: "Oh uh, Something went wrong",
        description: error.response.data.msg,
      });
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        await axios.get("/users");
        navigate("/home");
      } catch (error) {
        console.error(error);
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <>
      <div className="bg-gray-950 h-screen flex justify-center items-center text-slate-100">
        <div className="bg-slate-950 border-slate-600 border-2 rounded-md flex flex-col items-center p-8 w-[40%]">
          <div className="my-4 font-bold text-3xl">Login</div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <Label htmlFor="username" className="text-slate-200 mb-1">
                Username*
              </Label>
              <Input
                placeholder="Username"
                name="username"
                type="text"
                value={username}
                onChange={handleChange}
                className="border-slate-600"
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="password" className="text-slate-200 mb-1">
                Password*
              </Label>
              <Input
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                className="border-slate-600"
              />
            </div>
            <div className="flex justify-between items-center">
              <Button className="m-2">Submit</Button>
              <Link className="text-indigo-900" to="/register">
                Register?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
