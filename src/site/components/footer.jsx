import React from 'react';

function Footer() {
    let ano = new Date().getFullYear();

    return (
        <section id="footer">
            <div>
                <ul className=" list-inline social text-center mb-0">
                    <li className="list-inline-item"> <a href="https://www.facebook.com/Bruno.BoySenju" rel="noreferrer" target="_blank"><i className="fa-brands fa-facebook fa-2x mt-2" ></i> </a></li>
                    <li className="list-inline-item"> <a href="https://github.com/brunoDEVJ" rel="noreferrer" target="_blank"><i className="fa-brands fa-github fa-2x mt-2" ></i> </a></li>
                    <li className="list-inline-item"> <a href="https://www.instagram.com/bruno.boysenju/" rel="noreferrer" target="_blank"> <i className="fa-brands fa-instagram fa-2x mt-2"></i> </a></li>
                    <li className="list-inline-item"> <a href="https://www.linkedin.com/in/bruno-lima-gomes-67561624b/" rel="noreferrer" target="_blank"> <i className="fa-solid fa-envelope fa-2x mt-2"></i> </a></li>
                </ul>
            </div>
            <p>Desenvolvido por Bruno - {ano}</p>
        </section>
    )
}

export default Footer;