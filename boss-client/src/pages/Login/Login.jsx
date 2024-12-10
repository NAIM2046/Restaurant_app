import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "./../../assets/assets/login.svg";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import SocailLogin from "../../component/SocailLogin/SocailLogin";
const Login = () => {
  const negevite = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [disable, setDisable] = useState(true);
  const [captcha, setCaptcha] = useState("");
  console.log(captcha);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const { logIn } = useContext(AuthContext);
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    logIn(email, password)
      .then((result) => {
        console.log(result.user);
        alert("login successfull");
        negevite(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const valiCaptcha = () => {
    if (validateCaptcha(captcha)) {
      console.log("Captcha validated");
    } else {
      console.log("Invalid captcha");
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row mr-4">
        <div className="text-center w-1/2 lg:text-left">
          <img src={img} alt="" />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl text-center font-bold">Login now!</h1>
          <form onSubmit={handleLogin} className="card-body">
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
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplateNoReload />
                </label>
                <input
                  type="text"
                  placeholder="Enter Captcha Value"
                  name=""
                  className="input input-bordered"
                  required
                />
              </div>

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          <p className="my-4 text-center">
            New to Boss
            <Link to="/signup" className="text-orange-600 font-bold">
              SignUp{" "}
            </Link>
          </p>
          <SocailLogin></SocailLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
