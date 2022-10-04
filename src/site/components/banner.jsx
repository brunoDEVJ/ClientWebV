import React from 'react';
import {Link} from 'react-router-dom'

function Banner(){
    return (
        <section id="banner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h1>Gerencie seu Posto de Combustível</h1>
                        <h5>"Amar é o combustível da vida. O problema é que eu só encontro posto adulterado"</h5>
                        <Link to="/app/novaconta" className="btn btn-primary btn-lg btn-banner"> Criar uma conta </Link>
                        <Link to="/app" className="btn btn-primary btn-lg btn-banner"> Fazer Login </Link>
                    </div>
                    <div className="col-lg-6">  
                      <img src="imgs/mes.gif" alt="posto" />
                      </div>
                </div>
            </div>
        </section>
    )
  }

export default Banner;