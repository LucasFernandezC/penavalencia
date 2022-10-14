
import Modal from "../Modal/Modal";
import { useEffect, useState, useContext, useRef } from "react";
import "./LogWidget.scss"
import { logContext } from "../../context/LogContext";
import axios from 'axios'

const LogWidget = () => {

  
 
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    fechanac: "",
    email: "",
    telefono: "",
    domicilio: "",
    socio: "",
    sociofundador: "",
    password: "",
    passwordcheck: "",
    urlImg: ""
  })

  const [existErrorsNombre, setExistErrorsNombre] = useState(false);
  const [existErrorsMail, setExistErrorsMail] = useState(false);
  const [existErrorsPassword, setExistErrorsPassword] = useState(false);
  const [existErrorsTelefono, setExistErrorsTelefono] = useState(false);
  const [existErrorsFoto, setExistErrorsFoto] = useState(false);
  const [existErrors, setExistErrors] = useState(true);
  


  const { userLogged, userCredentials, validateUser, setUserCredentials, setUserLogged, userValidated, setUserValidated, setFormSubmitted, userRegister, passErr, setPassErr } = useContext(
    logContext
  );



  useEffect(() => {
    setExistErrors(false)
    validaData();

  }, [formData])

  useEffect(() => {
    setUserValidated(false)
    setPassErr(false)

  }, [])


  const logOut = () => {
    setUserCredentials({})
    setUserValidated(false)
    setUserLogged(false)
    setFormSubmitted(false)


  }
  const registro = () => {
    setShowModal(true)
  }
  const cargaArchivo = () => {

    
  }

  const submitData = async (e) => {
    await cargaArchivo()
    e.preventDefault()
    userRegister(formData)
    setUserValidated(false)
    document.getElementById("form").reset();

  }

  const userRegistration = () => {
    setUserValidated(true);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const changeHandler = (event) => {
    
    const data = new FormData();
    data.append("file", event.target.files[0])
    var usr = 'http://localhost:4000/user/uploadfile'
    fetch(usr, {
      method: 'POST',
      body: data,
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json.data)
        setFormData({ ...formData, urlImg: json.data.url })
    
      })

		
    
		
	};


  

  const validaData = () => {

    if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(formData.email)) {
      setExistErrors(true)
      setExistErrorsMail(true)

    }
    else {
      setExistErrorsMail(false)
    }

    if (!/^[A-Za-z]/.test(formData.nombre) || formData.nombre.length < 4) {

      setExistErrors(true)
      setExistErrorsNombre(true)
    }
    else {
      setExistErrorsNombre(false)
    }

    if (formData.telefono.length != 10 || isNaN(formData.telefono)) {
      setExistErrors(true)
      setExistErrorsTelefono(true)
    } else {
      setExistErrorsTelefono(false)
    }

    if (formData.password != formData.passwordcheck || formData.password.length == 0) {
      setExistErrors(true)
      setExistErrorsPassword(true)

    }
    else {
      setExistErrorsPassword(false)
    }
    
    if(formData.urlImg.length < 1){
      setExistErrors(true)
      setExistErrorsFoto(true)
    }else{
      
      setExistErrorsFoto(false)
    }


  }



  const validateLogUser = (e) => {
    e.preventDefault();
    setFormSubmitted(true)
    validateUser();



  }
  const handleChangeLog = (e) => {

    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })


  }


  return (
    <>
      <h2><i onClick={() => setShowModal(true)} className="bi bi-box-arrow-in-up"></i></h2>
      {showModal == true && (
        userLogged == true ? (
          <Modal title={"Cerrar sesion"} close={() => setShowModal(false)}>
            <div>
            <img className="avatar" src={userCredentials.urlImg}></img>
            </div>
            <div>
            <button type="submit" className="log__button" onClick={logOut}>Cerrar sesion!</button>
            </div>
          </Modal>
        ) : (
          userValidated ? (

            <Modal title={"Registro de nuevo usuario"} close={() => setShowModal()}>

              <form action="" id="form" className="form" onSubmit={submitData}>
                <input
                  type="text"
                  className="form__text"
                  name="nombre"
                  placeholder="Ingrese el nombre"
                  onChange={handleChange}

                />
                {existErrorsNombre && (
                  <p className="regiter__error">El nombre no es valido</p>
                )

                }
                <input
                  type="date"
                  className="form__text"
                  name="fechanac"
                  placeholder="Ingrese su fecha de nacimiento"
                  onChange={handleChange}

                />
                <input
                  type="number"
                  className="form__number"
                  name="telefono"
                  placeholder="Ingrese el telefono"
                  onChange={handleChange}

                />
                {existErrorsTelefono && (
                  <p className="regiter__error">El telefono no es valido</p>
                )

                }
                <input
                  type="email"
                  className="form__email"
                  name="email"
                  placeholder="Ingrese el mail"
                  onChange={handleChange}

                />
                {existErrorsMail && (
                  <p className="regiter__error">El mail no es valido</p>
                )

                }
                <input
                  type="text"
                  className="form__email"
                  name="domicilio"
                  placeholder="Ingrese el domicilio"
                  onChange={handleChange}

                />
                <input
                  type="text"
                  className="form__number"
                  name="socio"
                  placeholder="Ingrese numero de socio"
                  onChange={handleChange}

                />
                <input
                  type="text"
                  className="form__number"
                  name="sociofundador"
                  placeholder="Ingrese el numero de socio fundador"
                  onChange={handleChange}

                />
                <input
                  type="password"
                  className="form__text"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  onChange={handleChange}

                />
                <input
                  type="password"
                  className="form__text"
                  name="passwordcheck"
                  placeholder="Re-ingrese su contraseña"
                  onChange={handleChange}

                />
                {existErrorsPassword && (
                  <p className="regiter__error">Las contraseñas no coinciden</p>
                )

                }
                <input type="file" name="file" onChange={changeHandler} />
                {existErrorsFoto && (
                  <p className="regiter__error">Debe seleccionar una imagen</p>
                )

                }
                

                <div className="form__buttons">
                  {console.log("errores " ,existErrors)}
                  {existErrors==true ? (
                    <></>
                  ) : (<button type="submit" className="log__button">Confirmar!</button>)}

                  <button type="reset" onClick={logOut} className="log__button">Cancelar</button>
                </div>

              </form>
            </Modal>
          ) : (
            <Modal title={"Login usuario"} close={() => setShowModal()}>

              <form action="" id="form" className="form" onSubmit={validateLogUser}>
                <input
                  type="text"
                  className="form__text"
                  name="mail"
                  placeholder="Ingrese el mail"
                  onChange={handleChangeLog}

                />
                <input
                  type="password"
                  className="form__number"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  onChange={handleChangeLog}

                />
                {passErr && <p className="regiter__error">Contraseña Incorrecta</p>}
                <div className="form__buttons">
                  <button type="submit" className="log__button">Ingresar!</button>
                  <button onClick={userRegistration} className="log__button">Registrarme!</button>
                </div>
              </form>
            </Modal>
          )
        )
      )
      }

    </>

  )


}

export default LogWidget;