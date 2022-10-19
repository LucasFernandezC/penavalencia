import "./EventCard.scss"
import { useState, useEffect } from "react";

const EventCard = ({ props }) => {
    const opciones = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const [existEvent, setExistEvent] = useState()
    useEffect(() => {
        props.url=="https://contenidos2.sanlorenzo.com.ar/cdn/svg/escudos/mono/sanlorenzo.svg"?setExistEvent(false):setExistEvent(true)
        
    }, []);


    return (
        <div className="pepito">
            <article className=" card card__event">
                <h4>{props.eventdate.toLocaleDateString("es-ar", opciones)}</h4>
                
                <img
                    src={props.url}
                    className={!existEvent?"card__event__img__noevent":"card__event__img"}
                    alt="Evento"
                ></img>
                
                <div className="card-body text-center">
                    <h5 className="card-title ">{!existEvent?<small>{props.title}</small>:<strong>{props.title}</strong>}</h5>
                    <p className={!existEvent?"card-text card__text__noevent":"card-text card__text"}>
                        {props.text}
                    </p>




                </div>
            </article>
        </div>
    );
};

export default EventCard;