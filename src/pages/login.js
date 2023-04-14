import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

import { BASE_URL } from "../baseUrl";
import { ToastContainer, toast } from 'react-toastify';
import { LoadingOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");

  useEffect(() => {
    let authTokens = localStorage.getItem("authToken");
    if (authTokens) {
      navigate("/dashboard");
    }
  });

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
  };

  const setdata = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }
  const submit = () => {

    const { email, password } = data;
    if (!email || !password) {
      toast.error("Email or Password is required");
      return;
    }

    axios
      .post(`${BASE_URL}/login`, data)
      .then((res) => {
        toast.success("Login Successfully");
        localStorage.setItem("authToken", res.data.authToken);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.msg);
      });
    setData({ email: "", password: "" });
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="container mt-4">
        <div className="col-sm-6 mx-auto">
          <div className="login-form-border">
            <div>
              <h3 className="text-center pt-5">LOGIN FORM </h3>
            </div>
            <div className="login-form">
              <form onSubmit={handlesubmit}>

                <div>
                  <label>Email Id</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    id="Email"
                    onChange={setdata}
                    value={data.email}
                  />
                </div>

                <div className="mt-4">
                  <label>Password</label>
                  <div className="password_eye">
                    <input
                      type={passwordType}
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={data.password}
                      onChange={setdata}
                    />
                    <div className="eye_btn">
                      <button className="btn" onClick={togglePassword}>
                        {passwordType === "password" ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                      </button>
                    </div>
                  </div>
                  <div className="login-btn">
                    <button
                      type="submit"
                      name="submit"

                      value="Login" onClick={submit}


                    >Submit</button>
                  </div>

                  <p><NavLink to="/">For SignUp Click Here!!!</NavLink></p>



                </div>

              </form>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};

export default Login;
