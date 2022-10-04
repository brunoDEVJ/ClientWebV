import { Navigate, Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { useContext } from "react";
import { AuthConext } from "../context/auth";

import SweetAlert from "react-bootstrap-sweetalert";
import { regCEP, regIE, regTEL, regCNPJ } from "../regex/regex";

import { useEstados } from "../hooks/apiEstados";
import { useCidades } from "../hooks/apiCidades";

import "./editarcliente.css";

import Axios from "axios";

import Navbar from "../components/navbar/navbar";

function EditarCliente() {
  const { logado } = useContext(AuthConext);

  const { estados } = useEstados();
  const [selectEstado, setSelectEstado] = useState("");
  const { cidades } = useCidades({ uf: selectEstado });

  const handleEstadoChange = (event) => {
    setSelectEstado(event.target.value);
  };

  const { id } = useParams();

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

  const setDoCadastro = (event, key) => {
    setCadastro({ ...cadastro, [key]: event.target.value });
  };

  const [success, setSuccess] = useState("N");

  useEffect(() => {
    Axios.get(`http://localhost:3001/listar-cliente/${id}`).then((response) => {
      const clientes = response.data.cliente;
      setCadastro({
        ...cadastro,
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
    });
  }, [id]);

  function alterarCliente() {
    Axios.put(`http://localhost:3001/atualizar-cliente/${id}`)
      .then((response) => {
        const clientes = response.data.cliente;
      setCadastro({
        ...cadastro,
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
    })
      .then(() => {
       
        setSuccess("S");
      })
      .catch((err) => {
    
        setSuccess("N");
      });
  }
  return (
    <div>
      {logado ? null : <Navigate to="/app" />}
      <Navbar />

      <Navbar />
      <div className="container-fluid">
        <img src="../../imgs/profileEdit.jpg" className="img-edit" alt="edit" />
        <form className="row g-3">
          <div className="offset-lg-2 col-lg-4">
            <div className="mb-3 form-floating">
              <input
                value={cadastro.nome}
                onChange={(e) => setDoCadastro(e, "nome")}
                type="text"
                className="form-control"
                id="nome"
                aria-describedby="nomeHelp"
                title="Informe seu nome sem caracteres especiais e numeros"
                required
                placeholder=" "
                autoFocus
                max={30}
              />
              <label htmlFor="nome" className="form-label">
                Nome &#10098; Razão Social &#10099;
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                onChange={(e) => setDoCadastro(e, "cnpj")}
                value={cadastro.cnpj.replace(regCNPJ, "$1.$2.$3/$4-$5")}
                type="text"
                className="form-control"
                id="cnpj"
                aria-describedby="cnpjHelp"
                title="Somente CNPJ valido"
                placeholder=" "
                maxLength={14}
                minLength={14}
                required
              />
              <label htmlFor="CNPJ" className="form-label">
                CNPJ
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                onChange={(e) => setDoCadastro(e, "ie")}
                value={cadastro.ie.replace(regIE, "$1.$2-$3")}
                type="text"
                className="form-control"
                id="ie"
                aria-describedby="ieHelp"
                required
                title="Informe a Inscrição Estadual ou Isento"
                placeholder=" "
                maxLength={13}
                minLength={13}
              />
              <label htmlFor="exampleInputEmail1" className="form-label">
                Inscrição Estadual
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                onChange={(e) => setDoCadastro(e, "telefone")}
                value={cadastro.telefone
                  .toString()
                  .replace(regTEL, "($1) 9$2-$3")}
                type="tel"
                className="form-control"
                id="telefone"
                aria-describedby="telHelp"
                placeholder=" "
                minLength={10}
                maxLength={10}
              />
              <label htmlFor="exampleInputTel" className="form-label">
                Telefone &#10098; digite sem o 9 &#10099;
              </label>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3 form-floating">
              <input
                value={cadastro.endereço}
                onChange={(e) => setDoCadastro(e, "endereço")}
                type="text"
                className="form-control"
                id="endereço"
                aria-describedby="endereçoHelp"
                required
                title="Preencher com endereço(Rua/Av)"
                placeholder=" "
              />
              <label htmlFor="endereço" className="form-label">
                Endereço
              </label>
            </div>
            <div className="row g-3 ">
              <div className="col-lg-2 form-floating">
                <input
                  value={cadastro.n}
                  type="text"
                  className="form-control"
                  id="n"
                  onChange={(e) => setDoCadastro(e, "n")}
                  aria-describedby="nHelp"
                  placeholder="Nº"
                  maxLength={5}
                />
                <label htmlFor="floatingInput">Nº</label>
              </div>
              <div className="col-lg-5 form-floating">
                <input
                  value={cadastro.complemento}
                  onChange={(e) => setDoCadastro(e, "complemento")}
                  type="text"
                  className="form-control"
                  id="complemento"
                  aria-describedby="complementoHelp"
                  min={1}
                  title="Somente CNPJ valido"
                  placeholder=" "
                  required
                />
                <label htmlFor="complemento" className="form-label">
                  Complemento
                </label>
              </div>
              <div className="col-lg-5 mb-3 form-floating">
                <input
                  value={cadastro.bairro}
                  onChange={(e) => setDoCadastro(e, "bairro")}
                  type="text"
                  className="form-control"
                  id="bairro"
                  aria-describedby="bairroHelp"
                  placeholder=" "
                  minLength={2}
                />
                <label htmlFor="bairro" className="form-label">
                  Bairro
                </label>
              </div>
            </div>
            <div className="row g-3 ">
              <div className="col-lg-4 form-floating">
                <input
                  value={cadastro.cep.toString().replace(regCEP, "$1-$2")}
                  onChange={(e) => setDoCadastro(e, "cep")}
                  type="text"
                  className="form-control"
                  id="cep"
                  aria-describedby="complementoHelp"
                  placeholder=" "
                  required
                  maxLength={8}
                />
                <label htmlFor="complemento" className="form-label">
                  CEP
                </label>
              </div>
              <div className="col-lg-4 mb-2 form-floating">
                <select
                  name="uf"
                  value={selectEstado}
                  onChange={handleEstadoChange}
                  className="form-control"
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
                  name="cidade"
                  className="form-control"
                  id="cidade"
                  aria-describedby="cidadeHelp"
                  placeholder=" "
                >
                  <option value="">Selecionar</option>
                  {cidades.map((cidade) => (
                    <option key={cidade.nome} value={cidade.nome}>
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
                value={cadastro.email}
                onChange={(e) => setDoCadastro(e, "email")}
                type="tel"
                className="form-control"
                id="email"
                aria-describedby="telHelp"
                placeholder=" "
              />
              <label htmlFor="exampleInputTel" className="form-label">
                Email
              </label>
            </div>
          </div>

          <div className="col-lg-6"></div>
          <div className="text-center">
            <button
              onClick={"Alterar cliente"}
              type="button"
              className="btn btn-primary btn-acao"
            >
              Salvar
            </button>
            <Link to="/app/home" className="btn btn-outline-primary btn-acao">
              Cancelar
            </Link>

            {success === "S" ? (
              <SweetAlert
                onConfirm={() => setSuccess("N")}
                success
                confirmBtnText="OK!"
                title="Cliente cadastrado com sucesso!"
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

export default EditarCliente;
