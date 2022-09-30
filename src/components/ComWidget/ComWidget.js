
import Modal from "../Modal/Modal";
import { useEffect, useState, useContext, useRef } from "react";
import "./ComWidget.scss"
import { logContext } from "../../context/LogContext";
import { useLocation } from 'react-router-dom'


const ComWidget = (props) => {

  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [categories, setCategories] = useState()

  const { userLogged, userCredentials} = useContext(
    logContext
  );

  const [formData, setFormData] = useState({
    user: "",
    creationdate: "",
    category: "",
    title: "",
    msj: "",
    comments: []

  })

  useEffect(() => {
  
    getCategories()
    
  console.log(location.pathname);
  
  }, [])

  useEffect(() => {
    validaData();
  }, [formData])

  const validaData = () => {
    console.log("lalal", formData)
    
  }

  const getCategories = async () => {
    let resultado
    let url = "http://localhost:4000/getDataCategories"
    console.log(url)
    await fetch(url, {
        method: "GET",
        headers: {
            Accept: "aplication/json"
        }
    })
        .then((respuesta) => {

            respuesta.json()
                .then((data) => {
                    setCategories(data)
                    setFormData({...formData, category: categories[0].category})
                })
                .catch(() => {
                    console.log("sali por error  ")
                })

        }
        )
    return resultado
  }

  const handleChange = (e) => {
    setFormData({ ...formData, creationdate: new Date(Date.now()), user: userCredentials._id, [e.target.name]: e.target.value })
    
   
  }

  const submitPost = (e) => {
    e.preventDefault()
    postRegister();
    props.setNuevoPost(true)
    setShowModal(false)
  }
  const postRegister = async () => {


    var post = 'http://localhost:4000/inserPost'
    console.log("voy con esta infor ", post, formData)
    var data = JSON.stringify(formData)
    fetch(post, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data,
    })

      .then((response) => {
        console.log("esta es la respuesta ",response)
        
      })
      
  

  }

  return (
    <>
      <div className="com-widget">
        <h2><i onClick={() => setShowModal(true)} class="bi bi-file-plus"></i></h2>


      </div>
      {showModal && (

        userLogged == true ? (
          <Modal title={"Crear Post"} close={() => setShowModal(false)}>
            <form action="" id="form" className="form" onSubmit={submitPost}>
              <input
                type="text"
                className="form__text"
                name="title"
                placeholder="Ingrese el titulo"
                onChange={handleChange}

              />
              <select
                type="select"
                name="category"
                className="form__text"
                onChange={handleChange}
              >
                {categories.map((category)=>{
                  console.log(category)
                  return(
                    <option key={category._id} value={category.category}>{category.category}</option>
                  )
                })}
                </select>
              <textarea

                className="form__text"
                name="msj"
                placeholder="Detalle su Post"
                onChange={handleChange}

              />
              <div className="form__com__buttons">

                <button type="submit" className="com__button for_button">Confirmar!</button>
                
              </div>

            </form>
          </Modal>
        ) :
          (
            <Modal title={"Usuario no logueado"} close={() => setShowModal(false)}>
              <p>Por favor ingrese o registrese antes de Postear en el foro</p>
              <button onClick={() => setShowModal(false)} className="com__button">Aceptar</button>
            </Modal>))}
    </>
  )

}


export default ComWidget