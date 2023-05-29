export const postAgendarTutorias = async (idTutor, tutoria) => {
    const url = `http://localhost:8080/tutores/agendar-tutoria/${idTutor}`;
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tutoria)
    })
    const data = await resp.json();
}
