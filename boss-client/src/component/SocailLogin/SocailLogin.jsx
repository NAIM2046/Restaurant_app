import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import AuthProvider, { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../useMenu/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocailLogin = () => {
  const { signInwithoGoogle } = useContext(AuthContext);
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handlegoogleSignUp = () => {
    signInwithoGoogle().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      AxiosPublic.post("/users", userInfo).then((result) => {
        console.log(result.data);
        navigate("/");
      });
    });
  };
  return (
    <div className="m-4">
      <div className="divider"></div>
      <button onClick={handlegoogleSignUp} className="btn">
        <FaGoogle></FaGoogle>
        Google
      </button>
    </div>
  );
};

export default SocailLogin;
