
export const getTutores = async () => {
    const url = 'http://localhost:8080/tutores/todos'
    const resp = await fetch(url)
    const data = await resp.json();

    const tutorList = data.map(tutor => ({
        id: tutor.id,
        nombre: tutor.nombre,
        semestre: tutor.semestre,
        facultad: tutor.facultad,
        programa: tutor.programa,
        asignatura: tutor.asignatura,
        habilidades: tutor.habilidades,
        imagen: tutor.imagen
    }));
    console.log(tutorList)
    return tutorList;
}
