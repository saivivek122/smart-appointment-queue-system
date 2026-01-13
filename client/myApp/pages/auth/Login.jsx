import React, { useContext, useState } from "react";
import "./styles.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {login,isLoggedIn}=useContext(AuthContext)
  async function handleSubmit() {
    console.log("Hii");
    if (!user.email || !user.password) {
      setMessage("All fields are required");
      return;
    }
    setLoading(true);

    try {
      let response = await fetch(
        import.meta.env.VITE_BASE_URL + "/user/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      let data = await response.json();
      console.log(data);
      if (response.ok) {
        setMessage("Login Successfully");
        // localStorage.setItem("token",data.token)
        login(data.token,data.user)
        
      } else {
        setMessage(data.message || "Login Failed");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }
  if(isLoggedIn){
    {console.log("from login",isLoggedIn)}
    return <Navigate to="/home" replace/>
  }
  return (
    <div className="login-container">
      {/* <div className="left-container"></div> */}
      <div className="right-container">
        <div className="heading-link-container">
          <h1>Welcome Back</h1>
          <p>
            New to here ? <Link to="/register">Register</Link>
          </p>
        </div>
        <div className="input-fields-login-button">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={user.email}
            placeholder="Email address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            id="password"
            value={user.password}
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {message && <p className="message">{message}</p>}
          <button
            className="login-button"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
