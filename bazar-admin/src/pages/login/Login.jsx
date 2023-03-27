
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="lInput"
        />
        <button className="lButton">
        <Link to="/" className="link"> 
          Login
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
