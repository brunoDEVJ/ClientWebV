import React from "react";

function Menu() {
  return (
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
              <a className="nav-link active" aria-current="page" href="#banner">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#post">
                Clientes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#price">
              Produtos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#footer">
              Contato
              </a>
            </li>
          </ul>
        </div>
        <a className="navbar-brand" href="#banner">
          Vltech
        </a>
      </div>
    </nav>
  );
}

export default Menu;
