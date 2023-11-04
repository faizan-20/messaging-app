import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Signup from "./Signup"
import { useEffect, useState } from "react"
import Home from "./Home";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {

  const [auth, setAuth] = useState(false);

  async function checkAuth() {
    try {
      const res = await fetch('http://localhost:3000/checklogged', {
        method: "POST",
        headers: {
          "access-token": `${localStorage.getItem("token")}`
        }
      });
      const result = await res.json();
      console.log(result.user);
      if (result.user) {
        setAuth(true);
        return true;
      } else {
        setAuth(false);
        return false;
      }
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Routes>
      <Route 
        path="/"
        element={auth ? <Home socket={socket} /> : <Login />}
      />
      <Route 
        path="/signup"
        element={<Signup/>}
      />
    </Routes>
  )
}

export default App
