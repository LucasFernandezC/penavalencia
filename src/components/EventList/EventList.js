import EventCard from "../EventCard/EventCard"

const EventList = (props) => {

    return (
        <>
            <div className="row card__container">
                {props.props.map((event) => {

                    return (
                        <div className="col-md-6 col-lg-4 col-xl-3 col-xxl-2">
                            <EventCard props={event} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default EventList