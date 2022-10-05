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
        <Route path="/" element={<Site />} />
        <Route path="*/app" element={<Login />} />
        <Route path="/app/novaconta" element={<NovaConta />} />
        <Route path="/app/resetsenha" element={<ResetSenha />} />
        <Route path="/app/clientes" element={<Clientes />} />
        <Route path="/app/home" element={<Home />} />
        <Route path="/app/novocliente" element={<NovoCliente />} />
        <Route
          path="/app/editarcliente/:id"
          element={<EditarCliente />}
        />
      </Routes>
    </Router>
  );
}

export default App;
