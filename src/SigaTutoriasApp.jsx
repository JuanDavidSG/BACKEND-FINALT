import { useEffect, useState } from "react";
import { TablaTutores } from "./componentes/TablaTutores";
import { FormularioTutor } from "./componentes/FormularioTutor";
import { getTutores } from "./peticiones/getTutores";
import { postTutores } from "./peticiones/postTutores";
import { Tutorias } from "./componentes/Tutorias";
import { getTutorias } from "./peticiones/getTutorias";

export const SigaTutoriasApp = () => {
  const [tutores, setTutores] = useState([]);
  const [tutorias, setTutorias] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [activeTab, setActiveTab] = useState("tabla");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const agregarTutor = (tutor) => {
    const existeTutor = tutores.some((element) => element.id === tutor.id);
    const existeNombreTutor = tutores.some((element) => element.nombre === tutor.nombre);
    if (existeTutor || existeNombreTutor) {
      window.alert("¡El tutor ya existe!");
    } else {
      postTutores(tutor);
    }
  };  

  const filtrarTutores = (tutores, busqueda) => {
    if (busqueda === "") {
      return tutores;
    } else {
      const tutoresFiltrados = tutores.filter((est) =>
        est.asignatura && est.asignatura.toLowerCase().includes(busqueda.toLowerCase())
      );
      return tutoresFiltrados;
    }
  };

  const listaTutoresFiltrados = filtrarTutores(tutores, busqueda);

  const cargueTutores = async () => {
    const datos = await getTutores();
    setTutores(datos);
  };

  useEffect(() => {
    cargueTutores();
  }, []); 
  

  const cargueTutorias = async () => {
    const datos = await getTutorias();
    setTutorias(datos);
  };

  useEffect(() => {
    cargueTutorias();
  }, []);
  
  

  return (
    <>
      <h1 className="text-danger .font-weight-bold ">
        <center>SIGA TUTORÍAS</center>
      </h1>
      <div className="container">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tabla" ? "active" : ""}`}
              onClick={() => handleTabChange("tabla")}
            >
              Tutores Disponibles
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "agendarTutorias" ? "active" : ""}`}
              onClick={() => handleTabChange("agendarTutorias")}
            >
              Agendar Tutorias
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "formulario" ? "active" : ""}`}
              onClick={() => handleTabChange("formulario")}
            >
              ¿Quieres ser tutor?
            </button>
          </li>
        </ul>
        {}
        <div className="tab-content">
          <div className={`tab-pane ${activeTab === "tabla" ? "active" : ""}`} id="tabla">
            <TablaTutores
              listaTutores={listaTutoresFiltrados}
              handleTabChange={handleTabChange}
            />
          </div>

          <div
            className={`tab-pane ${activeTab === "agendarTutorias" ? "active" : ""}`}
            id="agendarTutorias"
          >
            <Tutorias  tutores={tutores}/>
          </div>

          <div className={`tab-pane ${activeTab === "formulario" ? "active" : ""}`} id="formulario">
            <FormularioTutor
              agregar={agregarTutor}
              setBusqueda={setBusqueda}
            />
          </div>
        </div>
      </div>
      <br />
      <h6 className="text">
        <center>
          Copyright © 2023 Andrea Forero, Julián Martinez, Juan David
          Sánchez, Derechos Reservados. / Bogotá (Colombia).
        </center>{" "}
      </h6>


      
    </>
  );
  
};


    