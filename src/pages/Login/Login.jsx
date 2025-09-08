import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../service/authenticationService";
import { PersonCircle, LockFill } from "react-bootstrap-icons";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(data.username, data.password);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", data.username);
      toast.success("Login successful 🎉");
      navigate("/");
    } catch (error) {
      toast.error("Invalid username or password ❌");
      console.error(error);
    }
  };

  return (
    <div className="login-page" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea, #764ba2)"
    }}>
      <div className="login-card card p-4 shadow-lg" style={{
        maxWidth: "400px",
        width: "100%",
        borderRadius: "15px",
        backgroundColor: "rgba(255, 255, 255, 0.95)"
      }}>
        <h3 className="text-center mb-4" style={{ fontWeight: "700", color: "#333" }}>
          Welcome Back
        </h3>
        <form onSubmit={handleLogin}>
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
            <LockFill style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#764ba2"
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
              onFocus={(e) => e.target.style.boxShadow = "0 0 8px #764ba2"}
              onBlur={(e) => e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"}
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg" style={{ borderRadius: "10px" }}>
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          Don’t have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
