import React, { useState } from "react";

export const TablaTutores = ({ listaTutores, handleTabChange }) => {
    const [filtroAsignatura, setFiltroAsignatura] = useState("");

    const filtrarTutores = (tutores, filtroAsignatura) => {
        return tutores.filter((tutor) =>
            tutor.asignatura.toLowerCase().includes(filtroAsignatura.toLowerCase())
        );
    };

    const tutoresFiltrados = filtrarTutores(listaTutores, filtroAsignatura);

    const handleProgramarTutoria = () => {
        handleTabChange("agendarTutorias");
    };

    return (
        <>
            <br />
            <div className="mb-3">
                <label htmlFor="Buscar" className="text-danger">Buscar:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar tutorías por asignatura"
                    value={filtroAsignatura}
                    onChange={(e) => setFiltroAsignatura(e.target.value)}
                />
            </div>
            <table className="table table-bordered table-striped table-primary">
                <thead>
                    <tr>
                        <th scope="col">Id Tutor</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Semestre</th>
                        <th scope="col">Facultad</th>
                        <th scope="col">Programa</th>
                        <th scope="col">Asignatura</th>
                        <th scope="col">Habilidades</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tutoresFiltrados.map((tutor) => (
                        <tr key={tutor.id}>
                            <td>{tutor.id}</td>
                            <td>{tutor.nombre}</td>
                            <td>{tutor.semestre}</td>
                            <td>{tutor.facultad}</td>
                            <td>{tutor.programa}</td>
                            <td>{tutor.asignatura}</td>
                            <td>{tutor.habilidades}</td>
                            <td>
                                {tutor.imagen && (
                                    <img
                                        src={tutor.imagen}
                                        alt="Imagen del tutor"
                                        style={{ width: "80px", height: "80px" }}
                                    />
                                )}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        handleProgramarTutoria();
                                    }}
                                >
                                    Programar tutoría
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr className="border-bottom" />


        </>
    );
};
