import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthConext } from "../context/auth";

import SweetAlert from "react-bootstrap-sweetalert";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Navbar from "../components/navbar/navbar";
import ListaCliente from "../components/listacliente/listacliente";

import Axios from "axios";

import RelClientesPDF from "../relatorios/relClientes";

import { regCEP, regIE, regTEL, regCNPJ } from "../regex/regex";

import { useEstados } from "../hooks/apiEstados";
import { useCidades } from "../hooks/apiCidades";

import "./clientes.css";

function Clientes() {
  const { logado } = useContext(AuthConext);
  const [aberto, setAberto] = useState(false);
  const [confirmacaoId, setConfirmacaoId] = useState("");

  const { estados } = useEstados();
  const [selectEstado, setSelectEstado] = useState("");
  const [selectCidade, setSelectCidade] = useState("");
  const { cidades } = useCidades({ uf: selectEstado });

  const [success, setSuccess] = useState("N");
  const [botoes, setBotoes] = useState(true);

  const [cliente, setClientes] = useState([]);
  const [confirmacao, setConfirmacao] = useState(false);
  const [busca, setBusca] = useState("");
  const [texto, setTexto] = useState("");
  const [excluido, setExcluido] = useState("");
  const [cadastro, setCadastro] = useState({
    nome: "",
    cnpj: "",
    ie: "",
    telefone: "",
    endereço: "",
    n: "",
    complemento: "",
    bairro: "",
    uf: "",
    cidade: "",
    cep: "",
    email: "",
  });

  useEffect(() => {
    let listaCliente = [];

    const urlGet = Axios.get("http://localhost:3001/listar-clientes");
    urlGet.then((resp) => {
      const docs = resp.data.clientes;

      docs.forEach((doc) => {
        if (doc.nome.indexOf(busca) >= 0) {
          listaCliente.push({
            id: doc.id,
            nome: doc.nome,
            cnpj: doc.cnpj,
            ie: doc.ie,
            telefone: doc.telefone,
            endereço: doc.endereço,
            n: doc.n,
            complemento: doc.complemento,
            bairro: doc.bairro,
            uf: doc.uf,
            cidade: doc.cidade,
            cep: doc.cep,
            email: doc.email,
          });
        }
      });
      setClientes(listaCliente);
    });
  }, [busca, aberto, excluido]);
  function confirmDeleteUser() {
    setConfirmacao(true);
  }

  const handleDelete = () => {
    Axios.delete(`http://localhost:3001/deletar-cliente/${confirmacaoId}`);
    setExcluido(confirmacaoId);
    setConfirmacao(false);
  };

  const setDoCadastro = (event, key) => {
    setCadastro({ ...cadastro, [key]: event.target.value });
  };

  const handleEstadoChange = (event) => {
    setSelectEstado(event.target.value);
  };
  const handleCidadeChange = (event) => {
    setSelectCidade(event.target.value);
  };

  function abrirModal(id) {
    setConfirmacaoId(id);
    setAberto(true);
    Axios.get(`http://localhost:3001/listar-cliente/${id}`).then((response) => {
      const clientes = response.data.cliente;
      setCadastro({
        ...cadastro,
        id: clientes.id,
        nome: clientes.nome,
        cnpj: clientes.cnpj,
        ie: clientes.ie,
        telefone: clientes.telefone,
        endereço: clientes.endereço,
        n: clientes.n,
        complemento: clientes.complemento,
        bairro: clientes.bairro,
        uf: clientes.uf,
        cidade: clientes.cidade,
        cep: clientes.cep,
        email: clientes.email,
      });
      setSelectEstado(clientes.uf);
      setSelectCidade(clientes.cidade);
    })
    
  }

  const salvarClienteModal = () => {
    Axios.put(`http://localhost:3001/atualizar-cliente/${confirmacaoId}`, {
      nome: cadastro.nome.toUpperCase(),
      cnpj: cadastro.cnpj,
      ie: cadastro.ie,
      telefone: cadastro.telefone,
      endereço: cadastro.endereço.toUpperCase(),
      n: cadastro.n,
      complemento: cadastro.complemento.toUpperCase(),
      bairro: cadastro.bairro.toUpperCase(),
      uf: selectEstado,
      cidade: selectCidade,
      cep: cadastro.cep,
      email: cadastro.email.toUpperCase(),
    })
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
    setBotoes(true)
  }

  function removeDisabled() {
    document
      .querySelectorAll("input.collection")
      .forEach((elemento) => elemento.removeAttribute("disabled"));
    document
      .querySelectorAll("select.collection")
      .forEach((elemento) => elemento.removeAttribute("disabled"));
    setBotoes(false)
  }

  function cancelar() {
    Axios.get(`http://localhost:3001/listar-cliente/${confirmacaoId}`).then((response) => {
      const clientes = response.data.cliente;
      setCadastro({
        ...cadastro,
        id: clientes.id,
        nome: clientes.nome,
        cnpj: clientes.cnpj,
        ie: clientes.ie,
        telefone: clientes.telefone,
        endereço: clientes.endereço,
        n: clientes.n,
        complemento: clientes.complemento,
        bairro: clientes.bairro,
        uf: clientes.uf,
        cidade: clientes.cidade,
        cep: clientes.cep,
        email: clientes.email,
      });
      setSelectEstado(clientes.uf);
      setSelectCidade(clientes.cidade);
    });
    document
    .querySelectorAll("input.collection")
    .forEach((elemento) => elemento.setAttribute("disabled", "disabled"));
  document
    .querySelectorAll("select.collection")
    .forEach((elemento) => elemento.setAttribute("disabled", "disabled"));
  setBotoes(true)
  }
  return (
    <div>
      {logado ? null : <Navigate to="/app" />}
      <Navbar />

      <div className="container-fluid titulo fonts ">
        <h1>Cadastro de Clientes</h1>
        <div className="row alinhamento">
          <div className="col-4">
            <Link
              to="/app/novocliente"
              className="btn btn-primary clienteb mb-1"
              type="button"
            >
              <i className="fa-solid fa-plus"></i> Cliente
            </Link>
            <button
              onClick={(e) => RelClientesPDF(cliente)}
              className="btn btn-danger btn-pdf mb-1"
              type="button"
              id="button-addon2"
            >
              <i className="fa-solid fa-file-pdf"></i> Gerar PDF
            </button>
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
        <ListaCliente
          arrayClient={cliente}
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
                Cliente Detalhado <strong>Codigo:{cadastro.id}</strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalbody">
              <form className="row g-3">
                <div className="offset-lg-2 col-lg-4">
                  <div className="mb-3 form-floating">
                    <input
                      disabled
                      value={cadastro.nome}
                      onChange={(e) => setDoCadastro(e, "nome")}
                      type="text"
                      className="form-control collection"
                      id="nome"
                    />
                    <label htmlFor="nome" className="form-label">
                      Nome &#10098; Razão Social &#10099;
                    </label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      disabled
                      value={cadastro.cnpj.replace(regCNPJ, "$1.$2.$3/$4-$5")}
                      onChange={(e) => setDoCadastro(e, "cnpj")}
                      type="text"
                      className="form-control collection"
                      id="cnpj"
                    />
                    <label htmlFor="CNPJ" className="form-label">
                      CNPJ
                    </label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      disabled
                      value={cadastro.ie.replace(regIE, "$1.$2-$3")}
                      onChange={(e) => setDoCadastro(e, "ie")}
                      type="text"
                      className="form-control collection"
                      id="ie"
                    />
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Inscrição Estadual
                    </label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      disabled
                      value={cadastro.telefone
                        .toString()
                        .replace(regTEL, "($1) 9$2-$3")}
                      onChange={(e) => setDoCadastro(e, "telefone")}
                      type="tel"
                      className="form-control collection"
                      id="telefone"
                    />
                    <label htmlFor="exampleInputTel" className="form-label">
                      Telefone &#10098; digite sem o 9 &#10099;
                    </label>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3 form-floating">
                    <input
                      disabled
                      value={cadastro.endereço}
                      onChange={(e) => setDoCadastro(e, "endereço")}
                      type="text"
                      className="form-control collection"
                      id="endereço"
                    />
                    <label htmlFor="endereço" className="form-label">
                      Endereço
                    </label>
                  </div>
                  <div className="row g-3 ">
                    <div className="col-lg-2 form-floating">
                      <input
                        disabled
                        value={cadastro.n}
                        onChange={(e) => setDoCadastro(e, "n")}
                        type="number"
                        className="form-control collection"
                        id="n"
                      />
                      <label htmlFor="floatingInput">Nº</label>
                    </div>
                    <div className="col-lg-5 form-floating">
                      <input
                        disabled
                        value={cadastro.complemento}
                        onChange={(e) => setDoCadastro(e, "complemento")}
                        type="text"
                        className="form-control collection"
                        id="complemento"
                      />
                      <label htmlFor="complemento" className="form-label">
                        Complemento
                      </label>
                    </div>
                    <div className="col-lg-5 mb-3 form-floating">
                      <input
                        disabled
                        value={cadastro.bairro}
                        onChange={(e) => setDoCadastro(e, "bairro")}
                        type="text"
                        className="form-control collection"
                        id="bairro"
                      />
                      <label htmlFor="bairro" className="form-label">
                        Bairro
                      </label>
                    </div>
                  </div>
                  <div className="row g-3 ">
                    <div className="col-lg-4 form-floating">
                      <input
                        disabled
                        value={cadastro.cep.toString().replace(regCEP, "$1-$2")}
                        onChange={(e) => setDoCadastro(e, "cep")}
                        type="text"
                        className="form-control collection"
                        id="cep"
                      />
                      <label htmlFor="complemento" className="form-label">
                        CEP
                      </label>
                    </div>
                    <div className="col-lg-4 mb-2 form-floating">
                      <select
                        disabled
                        name="uf"
                        value={selectEstado}
                        onChange={handleEstadoChange}
                        className="form-control collection"
                        id="uf"
                        aria-describedby="ufHelp"
                        placeholder=" "
                      >
                        <option value="">Selecionar</option>
                        {estados.map((estado) => (
                          <option value={estado.sigla} key={estado.id}>
                            {estado.sigla}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="uf" className="form-label">
                        UF
                      </label>
                    </div>
                    <div className="col-lg-4  mb-3 form-floating">
                      <select
                        disabled
                        value={selectCidade}
                        onChange={handleCidadeChange}
                        name="cidade"
                        className="form-control collection"
                        id="cidade"
                        aria-describedby="cidadeHelp"
                        placeholder=" "
                      >
                        <option value="">Selecionar</option>
                        {cidades.map((cidade) => (
                          <option value={cidade.nome} key={cidade.nome}>
                            {cidade.nome}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="cidade" className="form-label">
                        Cidade
                      </label>
                    </div>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      disabled
                      value={cadastro.email}
                      onChange={(e) => setDoCadastro(e, "email")}
                      type="email"
                      className="form-control collection"
                      id="email"
                    />
                    <label htmlFor="exampleInputTel" className="form-label">
                      Email
                    </label>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer className=" modalfooter  ">
                <Row  lg="auto">
                  <Col  >
                  <Button
                    variant="primary"
                    className="btn-modal"
                    onClick={removeDisabled}
                  >
                    EDITAR
                    <i className="fa-solid fa-user-pen acao-icon" />
                  </Button>
                  </Col>
                    <Col >
                      <Button
                        disabled={botoes}
                        id="abriredit"
                        variant="secondary"
                        className="btn-modal"
                        onClick={cancelar}
                      >CANCELAR
                        <i className="fa-solid fa-ban"></i>
                      </Button>
                      </Col>
                      <Col>
                      <Button
                      disabled={botoes}
                        id="abriredit"
                        variant="success"
                        className="btn-modal"
                        onClick={salvarClienteModal}
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
                  Deseja excluir o cliente selecionado?
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
                  title="Cliente alterado com sucesso!"
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

export default Clientes;
