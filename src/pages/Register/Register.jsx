import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser } from "../../service/userService";
import { PersonCircle, EnvelopeFill, LockFill } from "react-bootstrap-icons";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    await createUser(data); // pass the state object directly
    toast.success("Registration successful! Please log in.");
    navigate("/login");
  } catch (error) {
    // Show backend error message if available
    toast.error(
      "Error occurred: " + (error.response?.data?.message || error.message)
    );
    console.log("Registration error:", error.response?.data || error.message);
  }
};


  return (
    <div className="register-page" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea, #764ba2)"
    }}>
      <div className="register-card card p-4 shadow-lg" style={{
        maxWidth: "400px",
        width: "100%",
        borderRadius: "15px",
        backgroundColor: "rgba(255, 255, 255, 0.95)"
      }}>
        <h3 className="text-center mb-4" style={{ fontWeight: "700", color: "#333" }}>
          Sign Up
        </h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3 position-relative">
            <PersonCircle style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#667eea"
            }} />
            <input
              type="text"
              className="form-control form-control-lg ps-5"
              placeholder="Username"
              name="username"
              value={data.username}
              onChange={onChangeHandler}
              required
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "0.3s"
              }}
              onFocus={(e) => e.target.style.boxShadow = "0 0 8px #667eea"}
              onBlur={(e) => e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"}
            />
          </div>

          <div className="mb-3 position-relative">
            <EnvelopeFill style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#764ba2"
            }} />
            <input
              type="email"
              className="form-control form-control-lg ps-5"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              required
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "0.3s"
              }}
              onFocus={(e) => e.target.style.boxShadow = "0 0 8px #764ba2"}
              onBlur={(e) => e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"}
            />
          </div>

          <div className="mb-3 position-relative">
            <LockFill style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#667eea"
            }} />
            <input
              type="password"
              className="form-control form-control-lg ps-5"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              required
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "0.3s"
              }}
              onFocus={(e) => e.target.style.boxShadow = "0 0 8px #667eea"}
              onBlur={(e) => e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"}
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg" style={{ borderRadius: "10px" }}>
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
