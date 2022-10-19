const router = require("express").Router();
const Events = require("../src/models/Events");




router.get("/getevents", async function (req, res) {
    const events = await Events.find()
    console.log(events)
    res.send(events)
});

router.post("/events/addevent", async function (req, res) {
    console.log("me fui por eventos", req.body, req.params, res.body)

   
                    let respuesta = await insertEvent(req.body)
                    res.status(200)
                    res.send(respuesta)
   
})

const insertEvent = async (eventadd) => {
    console.log("esto llega al evento ", eventadd)
    const event = new Events({
        title: eventadd.title,
        eventdate: new Date(eventadd.eventdate),
        text: eventadd.text,
        url: eventadd.url,
        creationdate: new Date(Date.now())
    });
    console.log("esto es lo que quiero guardar: ", event)
    await event.save()
        .then((respuesta) => {
            return respuesta;
            

        })
        .catch((res) =>{
            console.log("error")
            console.log(res)
        })


}






module.exports = router