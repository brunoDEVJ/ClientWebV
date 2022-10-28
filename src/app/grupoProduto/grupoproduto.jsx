import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthConext } from "../context/auth";

import SweetAlert from "react-bootstrap-sweetalert";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Navbar from "../components/navbar/navbar";
import Listagrupoproduto from "../components/listagrupoproduto/listagrupoproduto";

import Axios from "axios";

import "./grupoproduto.css";

function Grupoproduto() {
  const { logado } = useContext(AuthConext);
  const [aberto, setAberto] = useState(false);
  const [confirmacaoId, setConfirmacaoId] = useState("");

  const [success, setSuccess] = useState("N");
  const [botoes, setBotoes] = useState(true);

  const [grupoproduto, setGrupoproduto] = useState([]);
  const [confirmacao, setConfirmacao] = useState(false);
  const [busca, setBusca] = useState("");
  const [texto, setTexto] = useState("");
  const [excluido, setExcluido] = useState("");
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

  useEffect(() => {
    let listagrupoproduto = [];

    const urlGet = Axios.get("https://serverwebv.herokuapp.com/grupoproduto");
    urlGet.then((resp) => {
      const docs = resp.data.grupoproduto;

      docs.forEach((doc) => {
        if (doc.nome.indexOf(busca) >= 0) {
          listagrupoproduto.push({
            GRUPO_PRODUTO_ID: doc.GRUPO_PRODUTO_ID,
            DESCRICAO: doc.DESCRICAO,
            MARGEMMINIMA: doc.MARGEMMINIMA,
            MARGEMMAXIMA: doc.MARGEMMAXIMA,
            ATIVO: doc.ATIVO,
            PERCENTUAL_MARKUP: doc.PERCENTUAL_MARKUP,
            VENDEDOR_ALTERA_PRECO: doc.VENDEDOR_ALTERA_PRECO,
            CODEMP: doc.CODEMP,
          });
        }
      });
      setGrupoproduto(listagrupoproduto);
    });
  }, [busca, aberto, excluido]);
  function confirmDeleteUser() {
    setConfirmacao(true);
  }

  const handleDelete = () => {
    Axios.delete(
      `https://serverwebv.herokuapp.com/grupoproduto/${confirmacaoId}`
    );
    setExcluido(confirmacaoId);
    setConfirmacao(false);
  };

  const setDoCadastro = (event, key) => {
    setCadastro({ ...cadastro, [key]: event.target.value });
  };

  function abrirModal(id) {
    setConfirmacaoId(id);
    setAberto(true);
    Axios.get(`https://serverwebv.herokuapp.com/grupoproduto/${id}`).then(
      (response) => {
        const GrupoProduto = response.data.grupoproduto;
        setCadastro({
          ...cadastro,
          GRUPO_PRODUTO_ID: GrupoProduto.GRUPO_PRODUTO_ID,
          DESCRICAO: GrupoProduto.DESCRICAO,
          MARGEMMINIMA: GrupoProduto.MARGEMMINIMA,
          MARGEMMAXIMA: GrupoProduto.MARGEMMAXIMA,
          ATIVO: GrupoProduto.ATIVO,
          PERCENTUAL_MARKUP: GrupoProduto.PERCENTUAL_MARKUP,
          VENDEDOR_ALTERA_PRECO: GrupoProduto.VENDEDOR_ALTERA_PRECO,
          CODEMP: GrupoProduto.CODEMP,
        });
      }
    );
  }

  const salvarGrupoProduto = () => {
    Axios.put(
      `https://serverwebv.herokuapp.com/grupoproduto/${confirmacaoId}`,
      {
        DESCRICAO: cadastro.DESCRICAO.toUpperCase(),
        MARGEMMINIMA: cadastro.MARGEMMAXIMA,
        MARGEMMAXIMA: cadastro.MARGEMMAXIMA,
        ATIVO: cadastro.ATIVO,
        PERCENTUAL_MARKUP: cadastro.PERCENTUAL_MARKUP.toUpperCase(),
        VENDEDOR_ALTERA_PRECO: cadastro.VENDEDOR_ALTERA_PRECO,
        CODEMP: cadastro.CODEMP.toUpperCase(),
      }
    )
      .then(() => {
        setSuccess("S");
      })
      .catch((err) => {
        setSuccess("N");
        console.log(err);
      });
  };

  function fecharModal() {
    setAberto(false);
    setBotoes(true);
  }

  function removeDisabled() {
    document
      .querySelectorAll("input.collection")
      .forEach((elemento) => elemento.removeAttribute("disabled"));
    document
      .querySelectorAll("select.collection")
      .forEach((elemento) => elemento.removeAttribute("disabled"));
    setBotoes(false);
  }

  function cancelar() {
    Axios.get(
      `https://serverwebv.herokuapp.com/grupoproduto/${confirmacaoId}`
    ).then((response) => {
      const GrupoProduto = response.data.grupoproduto;
      setCadastro({
        ...cadastro,
        GRUPO_PRODUTO_ID: GrupoProduto.GRUPO_PRODUTO_ID,
        DESCRICAO: GrupoProduto.DESCRICAO,
        MARGEMMINIMA: GrupoProduto.MARGEMMINIMA,
        MARGEMMAXIMA: GrupoProduto.MARGEMMAXIMA,
        ATIVO: GrupoProduto.ATIVO,
        PERCENTUAL_MARKUP: GrupoProduto.PERCENTUAL_MARKUP,
        VENDEDOR_ALTERA_PRECO: GrupoProduto.VENDEDOR_ALTERA_PRECO,
        CODEMP: GrupoProduto.CODEMP,
      });
    });
    document
      .querySelectorAll("input.collection")
      .forEach((elemento) => elemento.setAttribute("disabled", "disabled"));
    document
      .querySelectorAll("select.collection")
      .forEach((elemento) => elemento.setAttribute("disabled", "disabled"));
    setBotoes(true);
  }
  return (
    <div>
      {logado ? null : <Navigate to="/app" />}
      <Navbar />

      <div className="container-fluid titulo fonts ">
        <h1>Grupo de Produto</h1>
        <div className="row alinhamento">
          <div className="col-4">
            <Link
              to="/app/novogrupoproduto"
              className="btn btn-primary clienteb mb-1"
              type="button"
            >
              <i className="fa-solid fa-plus"></i> Grupo Produto
            </Link>
          </div>
          <div className="col-8">
            <div className="input-group mb-3">
              <input
                onChange={(e) => setTexto(e.target.value.toUpperCase())}
                type="text"
                className="form-control"
                placeholder="Pesquisar por nome"
                aria-label="Pesquisar por nome"
                aria-describedby="button-addon2"
              />
              <button
                onClick={(e) => setBusca(texto.toUpperCase())}
                className="btn btn-primary"
                type="button"
                id="button-addon2"
              >
                <i className="fa-solid fa-magnifying-glass"></i> Pesquisar
              </button>
            </div>
          </div>
        </div>
        <Listagrupoproduto
          arrayGrupoProduto={grupoproduto}
          clickDelete={confirmDeleteUser}
          pegarID={abrirModal}
        />

        <>
          <Modal
            size="xl"
            centered
            className="modal row g-2 fonts"
            show={aberto}
            onHide={fecharModal}
          >
            <Modal.Header closeButton className="modalheader">
              <Modal.Title className="titulos">
                Grupo Produto Detalhado{" "}
                <strong>Codigo:{cadastro.GRUPO_PRODUTO_ID}</strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalbody">
              <form className="row g-3">
                <div className="offset-lg-2 col-lg-4">
                  <div className="mb-3 form-floating">
                    <input
                      disabled
                      value={cadastro.DESCRICAO}
                      onChange={(e) => setDoCadastro(e, "DESCRICAO")}
                      type="text"
                      className="form-control collection"
                      id="DESCRICAO"
                    />
                    <label htmlFor="DESCRICAO" className="form-label">
                      DESCRICAO
                    </label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      disabled
                      value={cadastro.MARGEMMINIMA}
                      onChange={(e) => setDoCadastro(e, "MARGEMMINIMA")}
                      type="text"
                      className="form-control collection"
                      id="MARGEMMINIMA"
                    />
                    <label htmlFor="MARGEMMINIMA" className="form-label">
                      MARGEM MINIMA
                    </label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      disabled
                      value={cadastro.MARGEMMAXIMA}
                      onChange={(e) => setDoCadastro(e, "MARGEMMAXIMA")}
                      type="text"
                      className="form-control collection"
                      id="MARGEMMAXIMA"
                    />
                    <label htmlFor="MARGEMMAXIMA" className="form-label">
                      MARGEM MAXIMA
                    </label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      disabled
                      value={cadastro.ATIVO}
                      onChange={(e) => setDoCadastro(e, "ATIVO")}
                      type="text"
                      className="form-control collection"
                      id="ATIVO"
                    />
                    <label htmlFor="ATIVO" className="form-label">
                      ATIVO
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3 form-floating">
                    <input
                      disabled
                      value={cadastro.PERCENTUAL_MARKUP}
                      onChange={(e) => setDoCadastro(e, "PERCENTUAL_MARKUP")}
                      type="text"
                      className="form-control collection"
                      id="PERCENTUAL_MARKUP"
                    />
                    <label htmlFor="PERCENTUAL_MARKUP" className="form-label">
                      PERCENTUAL MARKUP
                    </label>
                  </div>
                  <div className="row g-3 ">
                    <div className="col-lg-2 form-floating">
                      <input
                        disabled
                        value={cadastro.VENDEDOR_ALTERA_PRECO}
                        onChange={(e) =>
                          setDoCadastro(e, "VENDEDOR_ALTERA_PRECO")
                        }
                        type="TEXT"
                        className="form-control collection"
                        id="VENDEDOR_ALTERA_PRECO"
                      />
                      <label htmlFor="VENDEDOR_ALTERA_PRECO">
                        VENDEDOR ALTERA PREÇO
                      </label>
                    </div>
                    <div className="col-lg-5 form-floating">
                      <input
                        disabled
                        value={cadastro.CODEMP}
                        onChange={(e) => setDoCadastro(e, "CODEMP")}
                        type="text"
                        className="form-control collection"
                        id="CODEMP"
                      />
                      <label htmlFor="CODEMP" className="form-label">
                        CODEMP
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer className=" modalfooter  ">
              <Row lg="auto">
                <Col>
                  <Button
                    variant="primary"
                    className="btn-modal"
                    onClick={removeDisabled}
                  >
                    EDITAR
                    <i className="fa-solid fa-user-pen acao-icon" />
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={botoes}
                    id="abriredit"
                    variant="secondary"
                    className="btn-modal"
                    onClick={cancelar}
                  >
                    CANCELAR
                    <i className="fa-solid fa-ban"></i>
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={botoes}
                    id="abriredit"
                    variant="success"
                    className="btn-modal"
                    onClick={salvarGrupoProduto}
                  >
                    SALVAR
                    <i className="fa-solid fa-user-pen acao-icon" />
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    className="btn-modal"
                    onClick={confirmDeleteUser}
                    type="button"
                  >
                    APAGAR
                    <i className="fa-solid fa-trash acao-icon" />
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="secondary"
                    className="btn-modal"
                    onClick={fecharModal}
                  >
                    VOLTAR <i className="fa-solid fa-circle-arrow-left"></i>
                  </Button>
                </Col>
              </Row>
              {confirmacao ? (
                <SweetAlert
                  warning
                  showCancel
                  showCloseButton
                  confirmBtnText={"Sim, deletar!"}
                  confirmBtnBsStyle="danger"
                  cancelBtnText="Não"
                  cancelBtnBsStyle="light"
                  title="Exclusão"
                  onConfirm={() => {
                    handleDelete(confirmacaoId);
                    fecharModal();
                  }}
                  onCancel={() => {
                    setConfirmacao(false);
                  }}
                  focusCancelBtn
                  reverseButtons={true}
                >
                  Deseja excluir o Grupo de Produto selecionado?
                </SweetAlert>
              ) : null}

              {success === "S" ? (
                <SweetAlert
                  onConfirm={() => {
                    setSuccess("N");
                    fecharModal();
                  }}
                  success
                  confirmBtnText="Ok!"
                  title="Grupo de Produto alterado com sucesso!"
                >
                  Click em "ok" para continuar
                </SweetAlert>
              ) : null}
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default Grupoproduto;
