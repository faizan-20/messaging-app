import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const result = await axios.post('/signup', {
                first_name: firstName,
                last_name: lastName,
                username: username,
                password: password
            });
            if (result.data) navigate("/");
        } catch (err) {
            console.error(err);
        }
        setUsername('');
        setPassword('');
    }

    return (
        <div className="h-screen bg-gray-900 flex flex-col text-slate-200 justify-center items-center" >
            <div className="h-[80%] w-[30%] bg-slate-800 px-10 py-20 flex flex-col justify-around rounded-md bg-opacity-60">
                <div className="font-bold text-2xl text-slate-200">Create a new account</div>
                <form action="#" className="h-[70%] flex flex-col justify-around" onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label htmlFor="first_name">First Name:</label>
                        <input type="text" name="first_name" id="first_name" onChange={e => setFirstName(e.target.value)} required/>
                    </div>
                    <div className="form-item">
                        <label htmlFor="last_name">Last Name:</label>
                        <input type="text" name="last_name" id="last_name" onChange={e => setLastName(e.target.value)}/>
                    </div>
                    <div className="form-item">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" id="username" onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-item">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className=" bg-emerald-800 rounded-md px-1 py-2 font-bold hover:bg-emerald-700 transition-all" >Create account</button>
                </form>
                <Link to="/" className=" text-indigo-800 hover:text-slate-500 transition-all">login?</Link>
            </div>
        </div>
    )
}