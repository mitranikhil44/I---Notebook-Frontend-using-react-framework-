import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Sign_up = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", conformPassword: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    if (credentials.conformPassword != credentials.password) {
      props.showAlert("Conform password and password dosen't match", "danger");
    } else {
      const response = await fetch(`https://notebook-backend-kappa.vercel.app/api/auth/sign_up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Your account has created successfully", "success");
        setCredentials({ name: "", email: "", password: "", conformPassword: "" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <>
      <section className="vh-100 my-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ bordeRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="name">Your Name</label>
                            <input type="text" id="name" name='name' onChange={onChange} className="form-control" />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="email">Your Email</label>
                            <input type="email" id="email" name='email' onChange={onChange} className="form-control" />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" minLength={5} required onChange={onChange} className="form-control" />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="conformPassword">Repeat your password</label>
                            <input type="password" id="conformPassword" name='conformPassword' minLength={5} onChange={onChange} required className="form-control" />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">Register</button>
                        </div>
                        <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
                          className="fw-bold text-primary"><u>Login here</u></Link></p>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="sign_up" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sign_up
