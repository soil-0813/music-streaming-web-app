import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">🎧</div>

        <h1>Welcome Back</h1>
        <p className="subtitle">Log in to your Stage account</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-row">
            <label>Password</label>
            <span className="forgot">Forgot?</span>
          </div>

          <input
            type="password"
            placeholder=""
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Log In</button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
