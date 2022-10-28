import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";

import { useContext } from "react";
import { AuthConext } from "../context/auth";

import SweetAlert from "react-bootstrap-sweetalert";

import "./novogrupoproduto.css";

import Axios from "axios";

import Navbar from "../components/navbar/navbar";

function Novogrupoproduto() {
  const { logado } = useContext(AuthConext);

  const [cadastro, setCadastro] = useState({
    GRUPO_PRODUTO_ID: "",
    DESCRICAO: "",
    MARGEMMINIMA: "",
    MARGEMMAXIMA: "",
    ATIVO: "",
    PERCENTUAL_MARKUP: "",
    VENDEDOR_ALTERA_PRECO: "",
    CODEMP: "",
  });

  const setDoCadastro = (event, key) => {
    setCadastro({ ...cadastro, [key]: event.target.value });
  };

  const [success, setSuccess] = useState("N");

  const cadastrarCliente = () => {
    Axios.post("https://serverwebv.herokuapp.com/grupoproduto", {
      GRUPO_PRODUTO_ID: cadastro.GRUPO_PRODUTO_ID.toUpperCase(),
      DESCRICAO: cadastro.DESCRICAO,
      MARGEMMINIMA: cadastro.MARGEMMINIMA,
      MARGEMMAXIMA: cadastro.MARGEMMAXIMA,
      ATIVO: cadastro.ATIVO.toUpperCase(),
      PERCENTUAL_MARKUP: cadastro.PERCENTUAL_MARKUP,
      VENDEDOR_ALTERA_PRECO: cadastro.VENDEDOR_ALTERA_PRECO.toUpperCase(),
      CODEMP: cadastro.CODEMP.toUpperCase(),
    }).then((resp) => {
      if (resp.data === 23000) alert("Cliente Duplicado");
      else setSuccess("S");
    });
  };


  return (
    <div>
      {logado ? null : <Navigate to="/app" />}
      <Navbar />

      <div className="container-fluid">
        <img src="../imgs/add.png" className="img-add" alt="add" />
        <form className="row g-3">
          <div className="offset-lg-2 col-lg-4">
            <div className="mb-3 form-floating">
              <input
                value={cadastro.DESCRICAO}
                onChange={(e) => setDoCadastro(e, "DESCRICAO")}
                type="text"
                className="form-control"
                id="DESCRICAO"
                aria-describedby="DESCRICAOHelp"
                title="Informe sua DESCRICAO sem caracteres especiais e numeros"
                required
                placeholder=" "
                autoFocus
                max={30}
              />
              <label htmlFor="DESCRICAO" className="form-label">
                DESCRIÇÃO
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                onChange={(e) => setDoCadastro(e, "MARGEMMINIMA")}
                value={cadastro.MARGEMMINIMA}
                type="text"
                className="form-control"
                id="MARGEMMINIMA"
                aria-describedby="MARGEMMINIMA"
                title="Somente MARGEMMINIMA valido"
                placeholder=" "
              />
              <label htmlFor="MARGEMMINIMA" className="form-label">
                MARGEM MINIMA
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                onChange={(e) => setDoCadastro(e, "MARGEMMAXIMA")}
                value={cadastro.MARGEMMAXIMA}
                type="text"
                className="form-control"
                id="MARGEMMAXIMA"
                aria-describedby="MARGEMMAXIMA"
                required
                title="Informe a MARGEM MAXIMA ou Isento"
                placeholder=" "
              />
              <label htmlFor="exampleInputEmail1" className="form-label">
                MARGEM MAXIMA
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                onChange={(e) => setDoCadastro(e, "ATIVO")}
                value={cadastro.ATIVO}
                type="tel"
                className="form-control"
                id="ATIVO"
                aria-describedby="ATIVO"
                placeholder=" "
              />
              <label htmlFor="ATIVO" className="form-label">
                ATIVO
              </label>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3 form-floating">
              <input
                onChange={(e) => setDoCadastro(e, "PERCENTUAL_MARKUP")}
                type="text"
                className="form-control"
                id="PERCENTUAL_MARKUP"
                aria-describedby="PERCENTUAL_MARKUPHelp"
                required
                title="Preencher com PERCENTUAL_MARKUP(Rua/Av)"
                placeholder=" "
              />
              <label htmlFor="PERCENTUAL_MARKUP" className="form-label">
                PERCENTUAL MARKUP
              </label>
            </div>
            <div className="row g-3 ">
              <div className="col-lg-2 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="VENDEDOR_ALTERA_PRECO"
                  onChange={(e) => setDoCadastro(e, "VENDEDOR_ALTERA_PRECO")}
                  aria-describedby="VENDEDOR_ALTERA_PRECO"
                  placeholder=""
                />
                <label htmlFor="VENDEDOR_ALTERA_PRECO">VENDEDOR ALTERA PRECO</label>
              </div>
              <div className="col-lg-5 form-floating">
                <input
                  onChange={(e) => setDoCadastro(e, "CODEMP")}
                  type="text"
                  className="form-control"
                  id="CODEMP"
                  aria-describedby="CODEMPHelp"
                  min={1}
                  title="Somente CODEMP valido"
                  placeholder=" "
                  required
                />
                <label htmlFor="CODEMP" className="form-label">
                  CODEMP
                </label>
              </div>
              </div>
          </div>

          <div className="col-lg-6"></div>
          <div className="text-center">
            <button
              onClick={cadastrarCliente}
              type="button"
              className="btn btn-primary btn-acao"
            >
              Salvar
            </button>
            <Link to="/app/grupoproduto" className="btn btn-outline-primary btn-acao">
              Cancelar
            </Link>

            {success === "S" ? (
               <SweetAlert
               onConfirm={() => setSuccess("N")}
               success
               confirmBtnText={<Link to="/app/grupoproduto" className="btn btnconf" > Ok!</Link>}
               title="Grupo de Produto cadastrado com sucesso!"
             >
               Click em "ok" para continuar
             </SweetAlert>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Novogrupoproduto;
