import { useState, useContext, FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { GoBackButton } from "../components/Buttons";

function Login() {
  const { user, login } = useContext(AuthContext);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPW, setLoginPW] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(loginEmail, loginPW);
      setSuccessMessage("Successfully logged in! ");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Successfully logged in! ");
    }
  };

  return (







    
    <div className="content">
      <section className="flex formSection">
        <div className="fomContentBox">
            {user ?  
           ( <>
            <h2>Login successful! </h2>
            <h4>Your vinyl adventure starts now</h4>
            <GoBackButton/>

            
            </>)
            
            : 
              (<>
              
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

                <button className="generalButton" type="submit">
                  Login!
                </button>

                <h4>I don't have an account, I want to register </h4>

            <Link to="/register">
              <button className="generalButtonYellow">Register</button>
            </Link>
            </form>
              </>)
             }

            {/* {successMessage && (
              <h4 className="success-message successTextColor">
                {successMessage}
              </h4>
            )}
            {errorMessage && (
              <h4 className="success-message successTextColor">
                {successMessage}
              </h4>
            )} */}

            
          
        </div>
        <img
          className="formImage"
          src="/img/suricata-front 1.png"
          alt="login-img"
        />
      </section>
    </div>
  );
}

export default Login;
