import React from "react";
import { useContext } from "react";
import { AuthConext } from "../context/auth";
import Navbar from "../components/navbar/navbar";

import "./home.css";
import { Navigate } from "react-router-dom";

function Home(props) {
const { logado } = useContext(AuthConext);




  return (
    <div>
    {logado  ? null : <Navigate to="/app" />}
    <Navbar></Navbar>
    <img src="../../imgs/loading.gif" alt="loading" />
    </div>
    )
}

export default Home;
