import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// import { useContext } from "react";
// import { AuthConext } from "./app/context/auth.jsx";
/*Paginas*/
import Site from "./site/site.jsx";
import Login from "./app/login/login.jsx";
import NovaConta from "./app/novaconta/novaconta";
import ResetSenha from "./app/resetsenha/resetsenha";
import Clientes from "./app/clientes/clientes";
import NovoCliente from "./app/novocliente/novocliente.jsx";
import EditarCliente from "./app/editarcliente/editarcliente.jsx";
import Home from "./app/home/home.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="webvltech.herokuapp.com/" element={<Site />} />
        <Route path="webvltech.herokuapp.com/app" element={<Login />} />
        <Route path="webvltech.herokuapp.com/app/novaconta" element={<NovaConta />} />
        <Route path="webvltech.herokuapp.com/app/resetsenha" element={<ResetSenha />} />
        <Route path="webvltech.herokuapp.com/app/clientes" element={<Clientes />} />
        <Route path="webvltech.herokuapp.com/app/home" element={<Home />} />
        <Route path="webvltech.herokuapp.com/app/novocliente" element={<NovoCliente />} />
        <Route
          path="webvltech.herokuapp.com/app/editarcliente/:id"
          element={<EditarCliente />}
        />
      </Routes>
    </Router>
  );
}

export default App;
