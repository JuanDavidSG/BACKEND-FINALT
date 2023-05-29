import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { Calendario } from "./Calendario";
import { postAgendarTutorias } from "../peticiones/postAgendarTutorias";
import { getTutorias } from "../peticiones/getTutorias";

export const Tutorias = ({ tutores }) => {

    const [tutorId , setTutorId] = useState(null)
    const [tutorSeleccionado, setTutorSeleccionado] = useState("");
    const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState("");
    const [eventos, setEventos] = useState([])

    useEffect(() => {
      getTutorias().then((data) => {
        const eventosTutor = data.filter((tutoria) => tutoria.tutorId === tutorId)
        setEventos(eventosTutor)
      }).catch((error) => {
        console.log(error)
      })
    }, [tutorId])


    useEffect(() => {
      if(tutorId){
        postAgendarTutorias(tutorId, eventos).then((data) => {
          console.log(data)
        }
        ).catch((error) => {
          console.log(error)
        } )
      }
    }, [eventos]);
  

    const manejarCambioTutor = (event) => {
      const tutorSeleccionado = event.target.value;
      setTutorSeleccionado(tutorSeleccionado);
      const tutorEncontrado = tutores.find(
        (tutor) => tutor.nombre === tutorSeleccionado
      );
      if (tutorEncontrado) {
        setTutorId(tutorEncontrado.id);
        setAsignaturaSeleccionada(tutorEncontrado.asignatura);
      } else {
        setAsignaturaSeleccionada("");
      }
    };
  
    const manejarCambioAsignatura = (event) => {
      const asignaturaSeleccionada = event.target.value;
      setAsignaturaSeleccionada(asignaturaSeleccionada);
    };
  
    return (
      <div style={{position:'relative'}}>
          <form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {}
              <h4 className="mt-5 text-success">1. Selecciona el tutor para agendar la tutoría</h4>
              <div className="form-group text-center">
                <label htmlFor="tutor" className="mb-1">Nombre del tutor</label>
                <select
                  className="form-control"
                  name= "tutor"
                  id="tutor"
                  required value={tutorSeleccionado}
                  onChange={manejarCambioTutor}
                >
                  <option value="">--Seleccione--</option>
                  {tutores.map((tutor) => (
                    <option key={tutor.id} value={tutor.nombre}>
                      {tutor.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
                {}
              <h4 className="mt-5 text-success">2. Asignatura a dictar</h4>
              <div className="form-group text-center">
                <label htmlFor="asignatura" className="mb-1">Asignatura</label>
                <select
                  className="form-control"
                  id="asignatura"
                  value={asignaturaSeleccionada}
                  onChange={manejarCambioAsignatura}
                  required
                >
                  <option value="">--Seleccione--</option>
                  <option value={asignaturaSeleccionada}>{asignaturaSeleccionada}</option>
                </select>
              </div>
              
              {}
              <h4 className="mt-5 text-success">3. Selecciona la fecha y hora de la tutoría</h4>
              <i>Seleccionar una casilla para ingresar la hora y la cantidad de horas que durará la tutoría</i>
              <br />

              <div className="row mt-4">
                {tutorSeleccionado && asignaturaSeleccionada ?
                <Calendario tutor = {tutorSeleccionado}
                            asignatura = {asignaturaSeleccionada}
                            setEventos = {setEventos}
                            eventos = {eventos}
                            tutorId = {tutorId}
                />
                : null
                }
              </div>
              
          </div>
          </form>
        </div>
    );
  };
  