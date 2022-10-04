import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import "./novaconta.css";

import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function NovaConta() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [success, setSuccess] = useState("");

  function registerUser() {
    setMensagem("");
    if (!email || !senha) {
      setMensagem("Informe todos os dados");
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        setSuccess("S");
      })
      .catch((err) => {
        setSuccess("");
        setMensagem(err.message);
      });
  }

  return (
    <div className="d-flex align-item-certer text-center container-form vw">
      <form className="login-form">
        <img className="mb-4 imglogin" src="/imgs/login.png" alt="Login" />
        <h1 className="h3 mb-3 fw-normal">Criar Conta</h1>

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
        <div className="form-floating">
          <input
            onChange={(e) => setSenha(e.target.value)}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Senha"
          />
          <label htmlFor="floatingPassword">Senha</label>
        </div>
        <button
          onClick={registerUser}
          className="w-100 btn btn-lg btn-primary"
          type="button"
        >
          Criar Conta
        </button>

        {success === "S" ? <Navigate to="/app/home" /> : null}

        {mensagem.length > 0 ? (
          <div className="alert alert-danger mt-2" role="alert">
            {mensagem}
          </div>
        ) : null}

        <div className="login-links mt-3">
          <Link to="/app" className="mx-3   ">
            Já tenho uma conta
          </Link>
        </div>

        <p className="mt-66 mb-0 p text-muted">&copy; Desenvolvido por <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/bruno-lima-gomes-67561624b/">Bruno</a></p>
      </form>
    </div>
  );
}

export default NovaConta;
