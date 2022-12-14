import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://notebook-backend-kappa.vercel.app/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authtoken);
            props.showAlert("You are successfully login your account", "success");
            setCredentials({email: "", password: ""});
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } else {
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <>
            <section className="vh-100 my-3">
                <div className="container-fluid h-custom card text-black" style={{bordeRadius: "25px"}}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample"/>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input type="email"  onChange={onChange} className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter a valid email address" />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="form-outline mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" onChange={onChange} className="form-control" value={credentials.password} id="password" name='password' placeholder="Enter password" />
                                </div>

                                {/* <div className="d-flex justify-content-between align-items-center">
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div> */}

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                        style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Login</button>
                                    <p className="my-2 small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signUp"
                                        className="link-danger">Register</a></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
