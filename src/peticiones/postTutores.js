export const postTutores = async (tutor) => {
    const url = 'http://localhost:8080/tutores/crear'
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tutor)
    })
    const data = await resp.json();

}
