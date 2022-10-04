import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./resetsenha.css";

import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function ResetSenha() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [success, setsuccess] = useState("");

  function recuperarSenha() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMensagem("");
        setsuccess("email enviado com sucesso");
      })
      .catch((err) => {
        setsuccess("");
        setMensagem("Erro ao enviar email" + err.message);
      });
  }

  return (
    <div className="d-flex align-item-certer text-center container-form vw">
      <form className="login-form">
        <img className="mb-4 imglogin" src="/imgs/login.png" alt="Login" />
        <h1 className="h3 mb-3 fw-normal">Recuperar Senha</h1>

        <div className="form-floating">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating"></div>
        <button
          onClick={recuperarSenha}
          className="w-100 btn btn-lg btn-primary mt-2 "
          type="button"
        >
          Enviar
        </button>

        {mensagem.length > 0 ? (
          <div className="alert alert-danger mt-2" role="alert">
            {mensagem}
          </div>
        ) : null}
        {success.length > 0 ? (
          <div className="alert alert-success mt-2" role="alert">
            {success}
          </div>
        ) : null}

        <div className="login-links mt-4">
          <Link to="/app" className="mx-3">
            Cancelar
          </Link>
        </div>

        <p className="mt-66 mb-0 p text-muted">&copy; Desenvolvido por <a className="login-links" rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/bruno-lima-gomes-67561624b/">Bruno</a></p>
      </form>
    </div>
  );
}

export default ResetSenha;
