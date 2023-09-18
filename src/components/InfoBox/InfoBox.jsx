import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InfoBox.css";

const InfoBox = ({ setLogoutModal }) => {
  const navigate = useNavigate();
  const handleNoClick = () => {
    setLogoutModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
    document.body.style.overflow = "auto";
    };
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("login");

    let logoutTimeout;
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }

    logoutTimeout = setTimeout(() => {
      navigate(`/`);
      document.location.reload();
    }, 1000);
  }

  return (
    <div className="container">
      <div className="logout-content modal-container">
        <h1>Deseja realmente sair da sua conta?</h1>
        <div className="logout-div-btn">
          <button className="logout-btn fs-20" onClick={logout}>
            Sim
          </button>
          <button className="logout-btn fs-20" onClick={handleNoClick}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
