import { useState, useContext, FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router';

function Login() {
  const { register, login } = useContext(AuthContext);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPW, setLoginPW] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPW, setRegisterPW] = useState("");

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    register(registerEmail, registerPW);
  };
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    login(loginEmail, loginPW);
  };

  return (
    <div className="content">
      <section className="flex formSection ">
        <div className="fomContentBox ">
          <h2>Log In & Keep the Music Spinning</h2>
          <form className="flex direction-column" onSubmit={handleLogin}>
            <input
              placeholder="enter email"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              placeholder="enter password"
              type="password"
              value={loginPW}
              onChange={(e) => setLoginPW(e.target.value)}
            />
            <button className="generalButton " type="submit">Login!</button>

            <h4>I don't have an account, I want to register</h4>

            <Link to="/register"><button className="generalButtonYellow " >Register</button></Link> {/* link */}
          </form>
        </div>
        <img className="formImage" src="/img/suricata-front 1.png"></img>
      </section>

    </div>
  );
}

export default Login;
