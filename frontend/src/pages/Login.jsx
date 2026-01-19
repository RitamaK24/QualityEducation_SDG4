import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Calling login API...");
      const data = await loginUser({ email, password });
      console.log("Login API response:", data);
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  /*

  const res = await loginUser({
    email,
    password
  });

  if (res.access_token) {
    localStorage.setItem("token", res.access_token);
    navigate("/dashboard");
  } else {
    setError(res.detail || "Login failed");
  }*/
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="app-title">AI Tutor</h1>
        <p className="app-subtitle">Personalized learning for mid-school students</p>
        <h2 className="login-title">Login</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleLogin}>
          <h3 className="login-subtitle">Email</h3>
          <input
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="login-subtitle">Password</h3>
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-button" type="submit">Login</button>

          <p className="login-footer">
            New user?{" "}
            <Link to="/signup" className="signup-link">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}


/*import { useState } from "react";
import "../styles/Login.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      setMessage("Login successful");
    } else {
      setMessage(data.error_description || "Login failed");
    }
  };

  /*return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Student Login</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full py-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-sm mt-3 text-red-500">{message}</p>
      </div>
    </div>
  );
}*/


/*return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">AI Tutor</h1>
        <p className="login-subtitle">
          Personalized learning for students
        </p>

        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}*/