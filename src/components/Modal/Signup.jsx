import React from "react";
import "./Modal.css";


const Signup = () => {
    return (
      <div className="signup">
        <h2>Cadastro</h2>
  
        <form action="" method="">
          <div className="form">
            <input type="text" placeholder="NAME"></input>
            <input type="email" placeholder="EMAIL"></input>
            <input type="text" placeholder="LOGIN"></input>
            <input type="password" placeholder="SENHA"></input>
            <input type="password" placeholder="CONFIRME A SENHA"></input>
            <hr />
            <button>Cadastrar</button>
          </div>
        </form>
      </div>
    );
  };

  export default Signup;