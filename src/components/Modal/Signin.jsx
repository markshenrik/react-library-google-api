import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signup from './Signup';
import axios from 'axios';
import "./Modal.css";


const Signin = () => {
  const [showSignup, setSignup] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSignupClick() {
    setSignup(!showSignup);
  }

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/sign', { login, password}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      const {user} = response.data;
      // axios.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`
      navigate(`/user/${user._id}`);

    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.msg);
      } else {
        setError("Erro ao fazer login. Verifique seu login e senha.");
      }
      console.error(error);
    }
  };

  return (
    <div>
      <div className="login">
          <div className="login-content">
            <header>
              <h2>Signin</h2>
              <Link to="/" className="modal-close" id="modalClose">
                &#10006;
              </Link>
            </header>
            <form action="" method="" className="form-container">
              <div className="form">
                <input
                  type="text"
                  name="login"
                  placeholder="LOGIN"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="SENHA"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onClick={handleSignin}>
                  Logar
                </button>
              </div>
              {error && <p className="error">{error}</p>}
              <hr />
              <div>
                <span>Ainda não tem uma conta?</span>
                <button
                  id="btn-signup-modal"
                  type="button"
                  name="signup"
                  onClick={handleSignupClick}
                >
                  Cadastre-se
                </button>
              </div>
            </form>
          </div>
        </div>
      {showSignup && <Signup />}
    </div>
  );
};

export default Signin;

