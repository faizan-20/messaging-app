import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Signup from "./Signup"
import PageNotFound from "./PageNotFound"
import { useEffect, useState } from "react"
import Home from "./Home";
import io from "socket.io-client";
import axios from "axios";

const AUTH_TOKEN = `${localStorage.getItem("token")}`;

if (AUTH_TOKEN.length > 0) {
  axios.defaults.headers.common['access-token'] = AUTH_TOKEN;
}

axios.defaults.baseURL = 'http://localhost:3000'
const socket = io.connect("http://localhost:3000");

function App() {

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});

  async function checkAuth() {
    try {
      const response = await axios.post('/checklogged');
      console.log(response);
      if (response.data) {
        setAuth(true);
        setUser(response.data);
      } else {
        setAuth(false);
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
        element={auth ? <Home socket={socket} user={user} /> : <Login />}
      />
      {
        auth ? 
        <Route 
          path="/signup"
          element={<PageNotFound/>}
        />
         : 
        <Route 
          path="/signup"
          element={<Signup/>}
        />
      }
    </Routes>
  )
}

export default App
