import { createContext, useState, useEffect } from "react";
import { JSEncrypt } from "jsencrypt"


const logContext = createContext();

const LogProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState({
    mail: "",
    name:"",
    password: "",
    penaId: "",
    _id: ""
  });

  const encrypt = new JSEncrypt();
  const publicKey = `
  -----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
  FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
  xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
  gwQco1KRMDSmXSMkDwIDAQAB
  -----END PUBLIC KEY-----`;
  const privateKey = `
  -----BEGIN RSA PRIVATE KEY-----
  MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
  WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
  aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
  AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
  xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
  m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
  8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
  z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
  rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
  V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
  aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
  psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
  uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
  -----END RSA PRIVATE KEY-----`
  encrypt.setPublicKey(publicKey);
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);


  const [userLogged, setUserLogged] = useState();
  const [userValidated, setUserValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState();
  const [passErr, setPassErr] = useState(false);

  useEffect(() => {
    formSubmitted && validateUser()
  }, [userLogged, formSubmitted])


  const checkPass = (clave) => {
    let resultado
    
    userCredentials.password == clave ? resultado = true : resultado = false;
    return resultado
  }

  const validateUser = async () => {
    let resultado
    let url = "http://localhost:4000/getData/" + userCredentials.mail
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
            console.log(data)
            let pass = data.password
            var desencriptada = decrypt.decrypt(pass)
            if (desencriptada) {
              if (checkPass(desencriptada)) {
                setUserLogged(true)
                setUserValidated(true)
                console.log(data.penaId)
                setUserCredentials({...userCredentials, penaId: data.penaId, _id:data._id, name: data.nombre})
              }
              else {
                console.log("password incorrecta")
                setPassErr(true)
                setUserLogged(false)
              }
            } else {
              setUserLogged(false)
              setUserValidated(true)
            }

          })
          .catch(() => {
            setUserValidated(true)
          })

      }
      )
    return resultado
  }

  const userRegister = (usuario) => {
    var encriptado = encrypt.encrypt(usuario.password)
    usuario.password=encriptado
    var data = JSON.stringify(usuario)
    var usr = 'http://localhost:4000/inserUser'
    fetch(usr, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data,
    })

      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json.data)
      })
  }





  const data = {
    validateUser,
    setUserCredentials,
    userLogged,
    setUserLogged,
    userValidated,
    setUserValidated,
    userCredentials,
    setFormSubmitted,
    userRegister,
    passErr,
    setPassErr,
  };

  return <logContext.Provider value={data}>{children}</logContext.Provider>;
};

export default LogProvider;

export { logContext };
