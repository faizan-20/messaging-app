import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const [avatar, setAvatar] = useState();
  const [progress, setProgress] = useState(13);

  const { fullName, username, email, password, confPassword } = formData;

  const { toast } = useToast();
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !username || !email || !password) {
      toast({
        variant: "destructive",
        title: "All fields are required",
      });
      return;
    }

    if (password !== confPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match.",
      });
      return;
    }
    setProgress(45);

    try {
      await axios.post(
        "/users/register",
        {
          fullName,
          username,
          email,
          password,
          avatar,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setProgress(100);
      navigate("/");
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
          <div className="my-2 font-bold text-3xl">Create a new account</div>
          <div className="flex-col">
            <form onSubmit={submitHandler}>
              <div className="mx-2 flex">
                <Input
                  placeholder="Full Name"
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={changeHandler}
                  className="border-slate-600 m-2"
                />
                <Input
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={changeHandler}
                  className="border-slate-600 m-2"
                />
              </div>
              <div className="mx-2 flex">
                <Input
                  placeholder="Email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={changeHandler}
                  className="border-slate-600 m-2"
                />
                <Input
                  placeholder="Profile Picture"
                  name="avatar"
                  type="file"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="border-slate-600 m-2"
                />
              </div>
              <div className="mx-2 flex">
                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={changeHandler}
                  className="border-slate-600 m-2"
                />
                <Input
                  placeholder="Confirm Password"
                  name="confPassword"
                  type="password"
                  value={confPassword}
                  onChange={changeHandler}
                  className="border-slate-600 m-2"
                />
              </div>
              <Button className="m-4">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
