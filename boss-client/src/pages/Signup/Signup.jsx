import React from "react";
import img from "./../../assets/assets/login.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../useMenu/useAxiosPublic";
import SocailLogin from "../../component/SocailLogin/SocailLogin";
const Signup = () => {
  const negevite = useNavigate();
  const { createuser, user, updateUserProfile } = useContext(AuthContext);
  const AxiosPublic = useAxiosPublic();
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photo.value;
    console.log(name, email, password, photoUrl);
    createuser(email, password)
      .then((result) => {
        console.log(result.user);
        alert("User create successfull");
        updateUserProfile(name, photoUrl)
          .then(() => {
            alert("User update successfull");
            const userInfo = {
              name,
              email,
            };
            AxiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                alert("user inserted database");
              }
            });
          })
          .catch((error) => {
            console.log(error.message);
          });
        negevite("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row mr-4">
        <div className="text-center w-1/2 lg:text-left">
          <img src={img} alt="" />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl text-center font-bold">SignUp now!</h1>
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                name="photo"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="SignUp" />
            </div>
          </form>
          <p className="my-4 text-center">
            Already Have an Account?
            <Link to="/login" className="text-orange-600 font-bold">
              Login
            </Link>
          </p>
          <SocailLogin></SocailLogin>
        </div>
      </div>
    </div>
  );
};

export default Signup;
