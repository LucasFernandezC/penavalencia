import { useState, useEffect } from "react"
import EventList from "../EventList/EventList";
import "./EventsContainer.scss"


const EventosContainer = () => {

  const [listEvents, setListEvents] = useState([]);
  const [dates, setDates] = useState([]);
  const [finalListEvents, setFinalListEvents] = useState([])

  useEffect(() => {
    getEvents().then(() => {

      console.log("cargue los eventos")
    });
  }, []);

  useEffect(() => {
    fillCalendar()
  }, [listEvents]);


  const getEvents = async () => {
    let arrayDates = []
    let arrayEvents = []
    for (let i = 0; i < 30; i++) {
      let fechas = {
        numero: i,
        fecha: new Date()
      }
      fechas.fecha.setHours(0, 0, 0, 0)
      fechas.fecha.setDate(fechas.fecha.getDate() + i)

      arrayDates.push(fechas)
    }
    setDates(arrayDates)
    let url = "http://localhost:4000/getevents"
    console.log("ruta: ", url)
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "aplication/json"
      }
    })
      .then((respuesta) => {
        respuesta.json()
          .then((data) => {
            data.forEach(element => {
              let temp = {
                _id: element._id,
                creationdate: element.creationdate,
                eventdate: new Date(element.eventdate),
                text: element.text,
                title: element.title,
                url: element.url
              }
              temp.eventdate.setHours(0, 0, 0, 0)
              console.log(temp, "elemento temporal ")
              arrayEvents.push(temp)

            });
            console.log("cargue el estado LIST EVENTS con ", arrayEvents)
            setListEvents(arrayEvents)

          })
          .catch(() => {
            console.log("sali por error  ")
          })

      }
      )

  };




  const fillCalendar = () => {
    
    console.log("llegue fillcalendar", listEvents)
    if (listEvents.length > 0) {
      let array = [];
      let encontre = "";
      dates.forEach(date => {
        
        listEvents.forEach(evento => {
          if (evento.eventdate.getTime() == date.fecha.getTime()) {
            array.push(evento)
            encontre = true
          }
        })
        encontre ? encontre = false : array.push({
          _id: "",
          title: "Solo soñar con volverte a ver Ciclon!",
          eventdate: date.fecha,
          text: "",
          url: "https://contenidos2.sanlorenzo.com.ar/cdn/svg/escudos/mono/sanlorenzo.svg",
          creationdate: ""
        })


      })
      console.log("esto cargo para mostrar ", array)
      setFinalListEvents(array)
    }

  }

  return (
    <article id="" className="col-md-12">
      <h2 className=""></h2>
      <div id="" className="col-lg-12  events__container">
        <EventList props={finalListEvents}></EventList>
      </div>
    </article>
  );
}

export default EventosContainer