export const getTutorias = async () => {
    const url = 'http://localhost:8080/tutores/tutorias'
    const resp = await fetch(url)
    const data = await resp.json();

    return data

}