import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ConfirmRegister from "../ConfirmRegister/ConfirmRegister";
import axios from "axios";
import "./Modal.css";

const Signin = () => {
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    login: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmRegister, setConfirmRegister] = useState({
    register: false,
    msg: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleFormEdit = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const handleForm = async (event) => {
    event.preventDefault();

    const isAnyFieldEmpty = () => {
      return (
        formData.name === "" ||
        formData.login === "" ||
        formData.password === "" ||
        formData.confirmPassword === ""
      );
    };

    if (isAnyFieldEmpty()) {
      setConfirmRegister({
        register: true,
        msg: "Todos os campos precisam ser preenchidos!",
      });
      setTimeout(() => {
        navigate(`/sign`);
        setConfirmRegister({ register: false });
        document.location.reload();
      }, 3000);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        formData
      );
      console.log(response.data);
      const { createdUser, token } = response.data;

      if (createdUser && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("login", createdUser.login);
      }
      if (response.status === 200) {
        setConfirmRegister({ register: true, msg: response.data.msg });

        setTimeout(() => {
          navigate(`/user/${formData.login}`);
          document.location.reload();
        }, 2000);
      }
    } catch (error) {
      const msgError = error.response;
      if (msgError.status === 409) {
        setConfirmRegister({ register: true, msg: msgError.data.msg });
        setTimeout(() => {
          navigate(`/`);
          document.location.reload();
        }, 2000);
      } else {
        setConfirmRegister({ register: true, msg: msgError.data.msg });
        setTimeout(() => {
          navigate(`/sign`);
          setConfirmRegister({ register: false });
          document.location.reload();
        }, 3000);
      }
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    const isAnyFieldEmpty = () => {
      return loginData.login === "" || loginData.password === "";
    };

    if (isAnyFieldEmpty()) {
      setConfirmRegister({
        register: true,
        msg: "Todos os campos precisam ser preenchidos!",
      });
      setTimeout(() => {
        navigate(`/sign`);
        setConfirmRegister({ register: false });
      }, 3000);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/sign",
        loginData
      );
      const { user, token } = response.data;

      if (user && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("login", user.login);
        setTimeout(() => {
          navigate(`/user/${user.login}`);
          window.location.reload(true);
        }, 1000);
      }
    } catch (error) {
      console.log(error.response);
      const msgError = error.response;
      setConfirmRegister({ register: true, msg: msgError.data.error });
      setTimeout(() => {
        setConfirmRegister({ register: false });
      }, 3000);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="container">
      {!confirmRegister.register ? (
        <div className="login-content modal-container">
          <div className="text-white bg-alt-black">
            <header className="header-login">
              <h2>Login</h2>
              <Link to="/" className="modal-close text-white" id="modalClose">
                &#10006;
              </Link>
            </header>
            <form onSubmit={handleSignin} className="form-container">
              <div className="form">
                <input
                  type="text"
                  name="login"
                  placeholder="LOGIN"
                  value={loginData.login}
                  onChange={(e) =>
                    setLoginData({ ...loginData, login: e.target.value })
                  }
                />
                <input
                  type="password"
                  name="password"
                  placeholder="SENHA"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <button type="submit">Logar</button>
              </div>
              <hr />
            </form>
          </div>
          <div className="signup text-white bg-alt-black">
            <h2>Cadastro</h2>
            <form onSubmit={handleForm}>
              <div className="form">
                <input
                  onChange={(e) => {
                    handleFormEdit(e, "name");
                  }}
                  name="name"
                  type="text"
                  placeholder="NAME"
                  value={formData.name}
                ></input>
                <input
                  onChange={(e) => {
                    handleFormEdit(e, "login");
                  }}
                  name="login"
                  type="text"
                  placeholder="LOGIN"
                  value={formData.login}
                ></input>
                <input
                  onChange={(e) => {
                    handleFormEdit(e, "password");
                  }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="SENHA"
                  value={formData.password}
                />
                <button
                  id="eye-icon"
                  type="button"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <FaEyeSlash style={{ height: "1rem" }} />
                  ) : (
                    <FaEye style={{ height: "1rem" }} />
                  )}
                </button>
                <input
                  onChange={(e) => {
                    handleFormEdit(e, "confirmPassword");
                  }}
                  name="confirmPassword"
                  type="password"
                  placeholder="CONFIRME A SENHA"
                  value={formData.confirmPassword}
                  onPaste={handlePaste}
                  onDrop={handleDrop}
                ></input>
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <ConfirmRegister msg={confirmRegister.msg} />
      )}
    </div>
  );
};

export default Signin;
