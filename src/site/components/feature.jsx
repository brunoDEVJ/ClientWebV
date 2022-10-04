import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faGlobe, faColumns } from "@fortawesome/free-solid-svg-icons";
function Feature() {
  return (
    <section id="feature">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 container-feature">
            <FontAwesomeIcon icon={faHeart} className="icon fa-4x" />
            <h3>Facil de usar</h3>
            <p>o sistema possui uma interface facil de usar</p>
          </div>
          <div className="col-lg-4 container-feature">
            <FontAwesomeIcon icon={faGlobe} className="icon fa-4x" />
            <h3>Em qualquer lugar</h3>
            <p>
              Gerencie seu fluxo de negócios de forma rapida, onde quer que você
              esteja.
            </p>
          </div>
          <div className="col-lg-4 container-feature">
            <FontAwesomeIcon icon={faColumns} className="icon fa-4x" />
            <h3>Organização é tudo</h3>
            <p>Tenha sua carteira de clientes sempre muito bem organizada.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feature;
