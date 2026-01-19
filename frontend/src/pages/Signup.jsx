/*import { useState } from "react";
import "../styles/Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    const res = await fetch("http://localhost:8000/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    setMessage(data.message);
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:8000/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Student Registration</h2>

        {step === 1 && (
          <>
            <input
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendOtp}>Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Verify OTP</button>
          </>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}*/
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Signup.css";

/*import { useState } from "react";
import "./Signup.css";*/

const API_URL = "http://localhost:8000";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    classLevel: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Student name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.classLevel) {
      newErrors.classLevel = "Please select a class ";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ api: data.detail || "Signup failed" });
        return;
      }

      setSuccess("Signup successful! You can now log in.");
      setFormData({
        name: "",
        email: "",
        password: "",
        classLevel: "",
      });
    } catch {
      setErrors({ api: "Backend server not running" });
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h1 className="app-title">AI Tutor</h1>
        <p className="app-subtitle">Personalized learning for mid-school students</p>
        <h2>SignUp</h2>

        {errors.api && <p className="error">{errors.api}</p>}
        {success && <p className="success">{success}</p>}

        <label>Student Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label>Class</label>
        <select
          name="classLevel"
          value={formData.classLevel}
          onChange={handleChange}
        >
          <option value="">Select Class</option>
          {[5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}
        </select>
        {errors.classLevel && (
          <p className="error">{errors.classLevel}</p>
        )}

        <button type="submit">Sign Up</button>

        <div className="signup-footer">
          Existing user?{" "}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </div>
        
      </form>

        
        
    </div>
  );
}


/*

<p className="signup-footer">
          Existing user?{" "}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </p>
        
        
    export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    classLevel: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    // later: send this to backend API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Student Signup
        </h2>

        {/* Student Name *//*}
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded text-black"
        />

        {/* Email *//*}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded text-black"
        />

        {/* Password *//*}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded text-black"
        />

        {/* Class *//*}
        <select
          name="classLevel"
          value={formData.classLevel}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded text-black"
        >
          <option value="">Select Class</option>
          {[5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}*/