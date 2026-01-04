import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful!");
      navigate("/");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <div className="signup-logo">🎧</div>

        <h1>Join the Stage</h1>
        <p className="subtitle">Create your music journey today</p>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <input type="text" placeholder="Your Name" />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Min. 8 characters"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="terms">
            <input type="checkbox" required />
            <span>
              I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>.
            </span>
          </div>

          <button type="submit">Create Account</button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log In</span>
        </p>
      </div>
    </div>
  );
}
