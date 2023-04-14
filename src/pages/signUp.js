import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../baseUrl";
const SignUp = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",

  })
  const userData = (e) => {

    setValues({ ...values, [e.target.name]: e.target.value });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  };


  const register = () => {

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { name, email, password, phoneNumber } = values;


    if (!name || !email || !password || !phoneNumber) {
      toast.error("Fill All The Fields")
      return
    }

    axios
      .post(`${BASE_URL}/signup`, { name: name, email: email, password: password, phoneNumber: phoneNumber }, config)
      .then((res) => {
        setValues(res.values)
        toast.success("You Signup Successfully")
        navigate('/login');
      })
      .catch((err) => {
        toast.error(err?.response?.values?.msg);
      });
    setValues({ name: "", email: "", password: "", dob: "", phoneNumber: "" })
  }
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="container mt-4">

        <div className="col-sm-6 mx-auto">
          <div className="form-border">
            <div>
              <h3 className="text-center pt-5">SIGNUP</h3>
            </div>
            <div className="signup-form">
              <form onSubmit={handleSubmit}>

                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"

                    placeholder="Enter Name"
                    name="name"
                    onChange={userData}
                    value={values.name}
                    required
                  />
                </div>
                <div >
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"

                    placeholder="Enter Email"
                    name="email"
                    onChange={userData}
                    value={values.email}
                    required
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"

                    placeholder="Password"
                    name="password"
                    id="Password"
                    onChange={userData}
                    value={values.password}
                    required
                  />
                </div>
                <div >
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className="form-control "

                    placeholder="phoneNumber"
                    name="phoneNumber"
                    id="phoneNumber"
                    maxLength={10}
                    onChange={userData}
                    value={values.phoneNumber}
                    required
                  />
                </div>

                <div className="submit-btn">
                  <input
                    type="submit"
                    name="submit"
                    value="SIGNUP" onClick={register}
                  />
                </div>

                <p><NavLink to="/login">For Login Click Here!!!</NavLink></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;