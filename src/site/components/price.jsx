import React from "react";

function Price() {
  return (
    <section id="price">
      <div className="container">
        <div className="row text-center">
          <div className="titulo">
            <h1>Planos e Preços</h1>
            <p>
              Comece a avaliação gratuitamente, não é necessário cartão de
              crédito!!
            </p>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h1>free</h1>
              </div>
              <div className="card-body">
                <h2>R$ 00,00 </h2>
                <p>Até 50 Clientes</p>
                <p>sem suport</p>
                <button className="btn btn-lg btn-outline-primary">
                  Comece Agora
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 border border-primary">
            <div className="card">
              <div className="card-header">
                <h1>free</h1>
              </div>
              <div className="card-body">
                <h2>R$ 00,00<small className="text-muted">&#47;mês</small></h2>
                <p>Até 50 Clientes</p>
                <p>sem suport</p>
                <button className="btn btn-lg btn-primary">
                  Assinar
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h1>free</h1>
              </div>
              <div className="card-body">
                <h2>R$ 00,00<small className="text-muted">&#47;mês</small></h2>
                <p>Até 50 Clientes</p>
                <p>sem suport</p>
                <button className="btn btn-lg btn-outline-primary">
                  Comece Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Price;
