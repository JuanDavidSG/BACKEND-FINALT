import { useState, useId, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'


export function Calendario({ tutor, asignatura, setEventos, eventos, tutorId }) {

    const [mostrarModal, setMostrarModal] = useState(false)
    const [evento, setEvento] = useState({})
    const estRef = useRef()
    const tiempoRef = useRef()


    const citasSinTraslape = (fechaInicio, fechaFin) => {
        const fechaInicioCita = new Date(fechaInicio)
        const fechaFinCita = new Date(fechaFin)
        const eventosTutorFiltrados = eventos.filter((evento) => {
            const fechaInicioEvento = new Date(evento.start)
            const fechaFinEvento = new Date(evento.end)
            if (fechaInicioCita.getTime() >= fechaInicioEvento.getTime() && fechaInicioCita.getTime() <= fechaFinEvento.getTime()) {
                return true
            }
            if (fechaFinCita.getTime() >= fechaInicioEvento.getTime() && fechaFinCita.getTime() <= fechaFinEvento.getTime()) {
                return true
            }
            if (fechaInicioCita.getTime() <= fechaInicioEvento.getTime() && fechaFinCita.getTime() >= fechaFinEvento.getTime()) {
                return true
            }
            return false
        })
        return eventosTutorFiltrados.length === 0


    }

    const agregarCita = (arg) => {
        const fechaCompleta = arg.dateStr.split('T')
        const fecha = fechaCompleta[0]
        const hora = fechaCompleta[1].split('-')[0]
        setEvento({ ...evento, fecha: fecha, hora: hora, nombre: tutor, asignatura: asignatura, tutorId: tutorId })
        setMostrarModal(true)
    }

    const guardarCita = () => {
        const infoUsuario = { nombre_est: estRef.current.value, tiempo: tiempoRef.current.value }
        const fechaInicio = evento.fecha + 'T' + evento.hora
        const fechaInicioCompleta = new Date(fechaInicio)
        const fechaFin = new Date(fechaInicioCompleta.setHours(fechaInicioCompleta.getHours() + parseInt(infoUsuario.tiempo)))
        if (citasSinTraslape(fechaInicio, fechaFin)) {
            const fechaFinString = fechaFin.toISOString()
            const datosListos = { ...evento, start: fechaInicio, end: fechaFinString, id: Math.random() * 43, title: `Tutoría ${infoUsuario.nombre_est} - ${evento.asignatura}` }
            setEventos((eventos) => [...eventos, { ...datosListos }])
        } else {
            alert('La tutoría se traslapa con otra, ingresa otro horario')
        }
        setMostrarModal(false)

    }

    const cerrarModal = () => {
        setMostrarModal(false)
    }

    return (
        <div style={{ width: '800px' }}>
            <div className='modal_calendario'>

                {mostrarModal &&
                    (
                        <div className="p-3"
                            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '1px solid black', borderRadius: '20px', zIndex: '9999', backgroundColor: 'gray' }}>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="nombre_est">Nombre estudiante</label>
                                    <input ref={estRef} type="text" className="form-control" id="nombre_est" placeholder="Nombre estudiante" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tiempo">¿Cuantas horas?</label>
                                    <input type="number" className="form-control" ref={tiempoRef} id="tiempo" placeholder="Duración tutoría" min={0} max={6} required />
                                </div>
                                <ul className="d-flex list-unstyled mt-2">
                                    <li><button onClick={guardarCita} type="button" className="btn btn-primary">Guardar</button></li>
                                    <li><button type="button" className="btn btn-danger" onClick={cerrarModal} >Cancelar</button></li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
            <FullCalendar
                height={'auto'}
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                locales={[esLocale]}
                initialView='timeGridWeek'
                weekends={true}
                events={eventos}
                eventContent={renderEventContent}
                dateClick={agregarCita}
                slotDuration={'01:00:00'}
                scrollTime={'06:00:00'}
                expandRows={true}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }}
                eventClick={function (arg) {
                    let mensaje = `${arg.event.title} el ${arg.event.start.toLocaleDateString()} a las ${arg.event.start.toLocaleTimeString()} hasta las ${arg.event.end.toLocaleTimeString()} . Tutor: ${arg.event.extendedProps.nombre}.`
                    alert(mensaje)
                }}
            />
        </div>
    )
}


function renderEventContent(eventInfo) {
    return (
        <>
            <i>{eventInfo.event.title}</i>
        </>
    )
}