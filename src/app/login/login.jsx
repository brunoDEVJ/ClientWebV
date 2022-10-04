import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import "./login.css";

import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { AuthConext } from "../context/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [sucesso, setSucesso] = useState("");
  const { setLogado } = useContext(AuthConext);

  function LoginUser() {
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        localStorage.setItem("logado", "S");
        setLogado(true);
        setSucesso("S");
      })
      .catch(() => {
        localStorage.setItem("logado", "N");
        setLogado(false);
        setSucesso("N");
      });
  }

  function alterarEmail(event) {
    setEmail(event.target.value);
  }
  function alterarSenha(event) {
    setSenha(event.target.value);
  }

  return (
    <div className="d-flex align-item-certer text-center container-form vw">
      <form className="login-form">
        <img className="mb-4 imglogin" src="imgs/login.png" alt="Login" />
        <h1 className="h3 mb-3 fw-normal">Login</h1>

        <div className="form-floating">
          <input
            onChange={alterarEmail}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating">
          <input
            onChange={alterarSenha}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Senha"
          />
          <label htmlFor="floatingPassword">Senha</label>
        </div>

        <button
          onClick={LoginUser}
          className="w-100 btn btn-lg btn-primary"
          type="button"
        >
          Acessar
        </button>
        <Link
          to="/"
          className="w-100 btn btn-lg btn-primary mt-2"
          type="button"
        >
          Voltar ao Site
        </Link>
        {sucesso === "N" ? (
          <div className="alert alert-danger" role="alert">
            E-mail ou senha inválidos
          </div>
        ) : null}
        {sucesso === "S" ? <Navigate to="/app/home" /> : null}
        <div className="login-links mt-3 flex">
          <Link to="/app/resetsenha" className="">
          Esqueci minha senha
          </Link>
          <Link to="/app/novaconta" className="">
            Criar Conta
          </Link>

        <p className="mt-6 mb-0 p text-muted">&copy; Desenvolvido por <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/bruno-lima-gomes-67561624b/">Bruno</a></p>
          </div>
      </form>
    </div>
  );
}

export default Login;
