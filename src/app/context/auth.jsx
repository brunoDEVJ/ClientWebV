import React, { useState, createContext } from "react";

const AuthConext = createContext({});

function AuthProvider(props) {
  const isLogado = localStorage.getItem('logado');
  const [logado, setLogado] = useState(isLogado === "S"? true : false);

  return (
    <AuthConext.Provider value={{ logado, setLogado }}>
      {props.children}
    </AuthConext.Provider>
  );
}

export { AuthConext, AuthProvider };
