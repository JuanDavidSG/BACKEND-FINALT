import { useEffect, useState } from "react"


export const FormularioTutor= ({ agregar }) => {
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [semestre, setSemestre] = useState("");
    const [facultad, setFacultad] = useState("");
    const [programa, setPrograma] = useState("");
    const [asignatura, setAsignatura] = useState("");
    const [habilidades, setHabilidades] = useState("");
    const [imagen, setImagen] = useState(null);
    

    const guardarTutor = (event) => {

        let tutor= {
            id: id,
            nombre: nombre,
            semestre: semestre,
            facultad: facultad,
            programa: programa,
            asignatura: asignatura,
            habilidades: habilidades,
            imagen: imagen
        }

        agregar(tutor);


        setId("");
        setNombre("");
        setSemestre("");
        setFacultad("");
        setPrograma("");
        setAsignatura("");
        setHabilidades("");
        setImagen(null);
    }

    const handleImagenSeleccionada = (event) => {
        const archivo = event.target.files[0]; 
        
        if (archivo) {
              const reader = new FileReader();
        
              reader.onload = (e) => {
                setImagen(e.target.result); 
              };
        
              reader.readAsDataURL(archivo);
            }
    };


    return (
        <>
            <h3 className="text-danger" >¿Quieres ser tutor?</h3>
            <form onSubmit={guardarTutor}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" id="nombre" placeholder="nombre" minlength="3" value={nombre} required onChange={(event) => setNombre(event.target.value)} />
                </div>
                <br />
                <div>
                    <label for="semestre-select">Semestre: </label>
                    <select className="form-select" name="semestre" id="semestre-select" required value={semestre} onChange={(event) => setSemestre(event.target.value)}>
                        <option value="">--Seleccione--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <br />
                <div>
                    <label for="facultad-select">Facultad: </label>
                    <select className="form-select" name="facultad" id="facultad-select" required value={facultad} onChange={(event) => setFacultad(event.target.value)}>
                        <option value="">--Seleccione--</option>
                        <option value="INGENIERIA">INGENIERIA</option>
                        <option value="MEDICINA">MEDICINA</option>
                        <option value="COMUNICACION">COMUNICACION</option>
                        <option value="DERECHO">DERECHO</option>
                    </select>
                </div>
                <br />
                <div>
                    <label for="programa-select">Programa: </label>
                    <select className="form-select" name="programa" id="programa-select" required value={programa} onChange={(event) => setPrograma(event.target.value)}>
                        <option value="">--Seleccione--</option>
                        <option value="INGENIERIA_INFORMATICA">INGENIERIA_INFORMATICA</option>
                        <option value="INGENIERIA_QUIMICA">INGENIERIA_QUIMICA</option>
                        <option value="INGENIERIA_MECANICA">INGENIERIA_MECANICA</option>
                        <option value="MEDICINA">MEDICINA</option>
                        <option value="FISIOTERAPIA">FISIOTERAPIA</option>
                        <option value="ENFERMERIA">ENFERMERIA</option>
                        <option value="COMUNICACION_SOCIALl">COMUNICACION_SOCIAL</option>
                        <option value="COMUNICACION_AUDIOVISUAL">COMUNICACION_AUDIOVISUAL</option>
                        <option value="FILOSOFIA">FILOSOFIA</option>
                        <option value="DERECHO">DERECHO</option>
                    </select>
                </div>
                <br />
                <div>
                    <label for="asignatura-select">Asignatura: </label>
                    <select className="form-select" name="asignatura" id="asignatura-select" required value={asignatura} onChange={(event) => setAsignatura(event.target.value)}>
                        <option value="">--Seleccione--</option>
                        <option value="CALCULO">CALCULO</option>
                        <option value="FISICA">FISICA</option>
                        <option value="PROGRAMACION">PROGRAMACION</option>
                        <option value="ALGEBRA_LINEAL">ALGEBRA_LINEAL</option>
                        <option value="ECONOMIA">ECONOMIA</option>
                        <option value="POLITICA_PUBLICA">POLITICA_PUBLICA</option>
                        <option value="LOGICA">LOGICA</option>
                        <option value="CORE">CORE</option>
                        <option value="CIENCIAS_BASICAS">CIENCIAS_BASICAS</option>
                    </select>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="habilidades">Escribe tus habilidades</label>
                    <input type="text" className="form-control" id="habilidades" placeholder="habilidades" minlength="3" value={habilidades} required onChange={(event) => setHabilidades(event.target.value)} />
                </div>
                <br />
                <div>
                    <label htmlFor="imagen-input">Imagen:</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="imagen-input"
                        accept="image/*"
                        onChange={handleImagenSeleccionada}
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-success">
                    Registrarme como tutor
                </button>
            </form>
            
        </>
    )
}