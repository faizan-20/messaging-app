import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const res = await fetch('http://localhost:3000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            const result = await res.json();
            localStorage.setItem("token", result.token);
        } catch(err) {
            console.error(err);
        }
        setUsername("");
        setPassword("");
    }

    return (
        <div className="h-screen bg-gray-900 flex flex-col text-slate-200 justify-center items-center" >
            <div className="h-[50%] w-[20%] bg-slate-800 px-10 py-20 flex flex-col justify-around rounded-md bg-opacity-60">
                <div className="font-bold text-3xl">Login</div>
                <form action="#" className="h-[50%] flex flex-col justify-around" onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" id="username" required />
                    </div>
                    <div className="form-item">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password" required />
                    </div>
                </form>
                <button type="submit" className=" bg-emerald-800 rounded-md px-1 py-2 font-bold hover:bg-emerald-700 transition-all" >Login</button>
                <Link to="/signup" className=" text-indigo-800 hover:text-slate-500 transition-all">Create new account</Link>
            </div>
        </div>
    )
}