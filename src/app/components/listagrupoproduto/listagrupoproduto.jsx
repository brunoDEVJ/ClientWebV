import React from "react";
import { Link } from "react-router-dom";

import "./listagrupoproduto.css";

function Listagrupoproduto(props) {
  return (
    <div className="container-fluid">
      <table className="table table-hover  table-striped table-bordered">
        <thead className="listaH">
          <tr className="table table-primary text-center">
            <th className="" scope="col">ID</th>
            <th scope="col">DESCRICAO</th>
            <th scope="col">MARGEMMINIMA</th>
            <th scope="col">MARGEMMAXIMA</th>
            <th scope="col">ATIVO</th>
            <th scope="col">PERCENTUAL MARKUP</th>
            <th scope="col">VENDEDOR ALTERA PREÇO</th>
            <th scope="col">COD EMP</th>
          </tr>
        </thead>
        <tbody className="listaC">
          {props.arrayGrupoProduto.map((grupoproduto) => {
            return (
                <tr className="listaCB text-center " key={grupoproduto.id}>
                <td>
                  <Link className="links" to="#" onClick={() => props.pegarID(grupoproduto.id)}><i className="fa-solid fa-magnifying-glass"></i> {grupoproduto.id}
                  </Link>
                </td>
                <td>{grupoproduto.DESCRICAO}</td>
                <td>{grupoproduto.MARGEMMINIMA}</td>
                <td>
                  {grupoproduto.MARGEMMAXIMA}
                </td>
                <td>{grupoproduto.ATIVO}</td>
                <td>{grupoproduto.PERCENTUAL_MARKUP}</td>
                <td>{grupoproduto.VENDEDOR_ALTERA_PRECO}</td>
                <td>{grupoproduto.CODEMP}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Listagrupoproduto;
