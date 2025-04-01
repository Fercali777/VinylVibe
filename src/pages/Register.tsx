import { useState, useContext, FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router';


function Register() {
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


      <section className="flex formSection">
        <div className="fomContentBox">
          <h2>Create Your Account & Turn Up the Volume</h2>
          <form className="flex direction-column" onSubmit={handleRegister}>
            <input
              placeholder="enter email"
              type="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              placeholder="enter password"
              type="password"
              value={registerPW}
              onChange={(e) => setRegisterPW(e.target.value)}
            />
            <button className="generalButton " type="submit">Register!</button>
            <h4>I already have an account, I want to log in.</h4>
            <Link to="/login"><button className="generalButtonYellow " >Log In</button></Link> {/* link */}
          </form>
          
        </div>
        <img className="formImage" src="/img/suricata-front 1.png"></img>
      </section>
    </div>
  );
}

export default Register;