import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");
const Login = () => {
  const navigate = useNavigate()
    const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const handleSubmitClick = (e) => {
    e.preventDefault();

    const userData = {
      Email: email,
      Password: password,
    };
    // console.log(userData);

    const LoginUrl = `http://localhost:5000/user_login`;
    axios
      .post(LoginUrl, JSON.stringify(userData), {
        headers: {
          Accept: "auth",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const login = response.data;
        if (login.success === true) {
          localStorage.removeItem("email", login.result.Email);
          localStorage.removeItem("id", login.result.id);
          localStorage.removeItem("admin", login.result.admin);
          localStorage.removeItem("Position", login.result.Position);
          localStorage.removeItem("user", JSON.stringify(login.result));
          localStorage.setItem("Position", login.result.Position);
          localStorage.removeItem("Technology", login.result.Technology);
          
          localStorage.setItem("Technology", login.result.Technology);
          localStorage.setItem("email", login.result.Email);
          localStorage.setItem("id", login.result.id);
          localStorage.setItem("admin", login.result.admin);
          localStorage.setItem("user", JSON.stringify(login.result));
          navigate("/");
          window.location.href = window.location.href;
        }else{
          localStorage.removeItem("email", login.result.Email);
          localStorage.removeItem("id", login.result.id);
          localStorage.removeItem("admin", login.result.admin);
          localStorage.removeItem("Technology", login.result.Technology);
          localStorage.removeItem("Position", login.result.Position);
          
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: err.response.data.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <>
      <div className="container-fluid position-relative p-0">
        <div
          className="container-fluid bg-primary py-5 bg-header"
          style={{ marginBottom: "90px" }}
        >
          <div className="row py-5">
            <div className="col-12 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-4 text-white animated zoomIn">Login</h1>
              <Link to="/" className="h5 text-white">
                Home
              </Link>
              <i className="far fa-circle text-white px-2"></i>
              <Link to="/login" className="h5 text-white">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="card ms-auto me-auto col-4">
            <h1 className="text-white bg-primary text-center">Login</h1>
            <form onSubmit={handleSubmitClick} className="p-2">
              <div className="mb-3">
                <label for="nameFormControlInput1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="nameFormControlInput1"
                  placeholder="Employee Email"
                  value={email}
              onChange={(e) => setEmail(e.target.value)}

                />
              </div>
              <div className="mb-3">
                <label for="nameFormControlInput1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="nameFormControlInput1"
                  placeholder="Enter Your Password"
                                value={password}
                onChange={(e) => setPassword(e.target.value)}

/>
              </div>
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
