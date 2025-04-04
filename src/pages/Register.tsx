import { useState, useContext, FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { GoBackButton } from "../components/Buttons";

function Register() {
  const { register } = useContext(AuthContext);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPW, setRegisterPW] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [successMessage] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await register(registerEmail, registerPW, registerName);
      setIsRegistered(true); // Oculta el formulario tras el registro
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="content">
      <section className="flex formSection">
        <div className="fomContentBox">
          {isRegistered ? (
            <>
            <h2>Create Your Account & Turn Up the Volume</h2>
            <h4>Your vinyl adventure starts now</h4>
            <GoBackButton/>
            
            
            </>
          ) : (
            <>
              <h2>Create Your Account & Turn Up the Volume</h2>
              <form className="flex direction-column" onSubmit={handleRegister}>
                <input
                  placeholder="Enter your name"
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
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
                <button className="generalButton " type="submit">
                  Register!
                </button>
                <h4>I already have an account, I want to log in.</h4>
                <Link to="/login">
                  <button className="generalButtonYellow ">Log In</button>
                </Link>{" "}
                {/* link */}
              </form>
            </>
          )}

          {successMessage && (
            <h4 className="success-message successTextColor">
              {successMessage}
            </h4>
          )}
        </div>
        <img className="formImage" src="/img/suricata-front 1.png"></img>
      </section>
    </div>
  );
}

export default Register;
