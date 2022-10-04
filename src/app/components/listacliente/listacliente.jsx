import React from "react";
import { Link } from "react-router-dom";

import {  regTEL, regCNPJ } from "../../regex/regex";

import "./listacliente.css";

function ListaCliente(props) {
  return (
    <div className="container-fluid">
      <table className="table table-hover  table-striped table-bordered">
        <thead className="listaH">
          <tr className="table table-primary text-center">
            <th className="" scope="col">ID</th>
            <th scope="col">NOME</th>
            <th scope="col">CNPJ</th>
            <th scope="col">TELEFONE</th>
            <th scope="col">EMAIL</th>
            <th scope="col">ENDEREÇO</th>
            <th scope="col">Nº</th>
            <th scope="col">COMPLE</th>
            <th scope="col">BAIRRO</th>
            <th scope="col">CIDADE</th>
          </tr>
        </thead>
        <tbody className="listaC">
          {props.arrayClient.map((cliente) => {
            return (
                <tr className="listaCB text-center " key={cliente.id}>
                <td>
                  <Link className="links" to="#" onClick={() => props.pegarID(cliente.id)}><i className="fa-solid fa-magnifying-glass"></i> {cliente.id}
                  </Link>
                </td>
                <td>{cliente.nome}</td>
                <td>{cliente.cnpj.replace(regCNPJ, "$1.$2.$3/$4-$5")}</td>
                <td>
                  {cliente.telefone.toString().replace(regTEL, "($1) 9$2-$3")}
                </td>
                <td>{cliente.email}</td>
                <td>{cliente.endereço}</td>
                <td>{cliente.n}</td>
                <td>{cliente.complemento}</td>
                <td>{cliente.bairro}</td>
                <td>{cliente.cidade}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListaCliente;
