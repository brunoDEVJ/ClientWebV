/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

import { AuthConext } from "../../context/auth";
import { useContext } from "react";

function Navbar() {
  const { setLogado } = useContext(AuthConext);

  function Logout() {
    setLogado(false);
    localStorage.removeItem("logado");
  }

  return (
    <div className="fonts">
      <nav className="navbar fixed-top navbar-expand-lg bg-primary navbar-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/app/home"
                  className="nav-link active"
                  aria-current="page"
                  href="#banner"
                >
                  <i className="fa-solid fa-house" /> Inicio
                </Link>
              </li>
              <li className="nav-item dropdown rov">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-plus"> </i> Cadastro
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Posto
                    </a>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to="/app/clientes"
                      className="dropdown-item"
                      aria-current="page"
                      href="#post"
                    >
                      Clientes
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to="/app/grupoproduto"
                      className="dropdown-item"
                      aria-current="page"
                      href="#post"
                    >
                      Grupo Produto
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Fornecedores
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-sharp fa-solid fa-file"></i> Relatorios
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item btn" href="#">
                      Vendas
                    </button>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to="/app/clientes"
                      className="dropdown-item"
                      aria-current="page"
                      href="#post"
                    >
                      Clientes
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Fornecedores
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link
            onClick={Logout}
            to="/app"
            className="navbar-brand"
            aria-current="page"
            href="#price"
          >
            <i className="fa-solid fa-arrow-right-from-bracket" /> Sair
          </Link>
          <a className="navbar-brand" href="#banner">
            Vltech
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
