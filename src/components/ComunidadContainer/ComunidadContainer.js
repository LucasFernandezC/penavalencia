import "./ComunidadContainer.scss"
import { useState, useEffect } from "react";
import ComunidadList from "../ComunidadList/ComunidadList";
import ComWidget from "../ComWidget/ComWidget";
import LogWidget from "../LogWidget/LogWidget";

const ComunidadContainer = () => {

    const [posts, setPosts] = useState([])
    const [cantidadPost, setCantidadPost] = useState()
    const [nuevoPost, setNuevoPost] = useState(false)
    const [categorias, setCategorias] = useState([{

    }])

    useEffect(() => {
        getPosts().then((data) => {
            console.log("traje las cates", data)
        })
    }, [nuevoPost])


    const getPosts = async () => {
        let array = []
        let resultado
        let url = "http://localhost:4000/getDataPosts"
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
                        setCantidadPost(data.length)
                        data.forEach(element => {

                            let index = array.findIndex((el) => el.categoria == element.category
                            )

                            if (index === -1) {
                                array.push({ categoria: element.category, cantidad: 1 })

                            } else {
                                array[index].cantidad++
                            }
                        })
                        console.log("cargue el array", array)
                        setCategorias(array)
                    })
                    .catch(() => {
                        console.log("sali por error  ")
                    })

            }
            )
        return resultado
    }


    return (
        <>


            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="wrapper wrapper-content animated fadeInRight">

                            <div className="ibox-content m-b-sm border-bottom">
                                <div className="p-xs">
                                    <div className="pull-left m-r-md">
                                        <i className="fa fa-globe text-navy mid-icon"></i>
                                    </div>
                                    <h2>Bienvenido al foro de la Peña Cuervo Che</h2>
                                    <span>Podes seleccionar la categoria que mas te guste para ver los posts de los usuarios</span>

                                </div>

                            </div>

                            <div className="ibox-content forum-container">
                                <div className="row">
                                    <div className="forum-title-display col-lg-11">
                                        <div className="forum-title">
                                            <h3>Foros </h3>
                                            <div className="pull-right forum-desc">
                                                <samll>Total posts: {cantidadPost}</samll>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-1">
                                        <ComWidget inicial="1" setNuevoPost={setNuevoPost} />
                                    </div>
                                </div>
                                {categorias.map((categoria) => {
                                    console.log(categoria)
                                    return (
                                        <ComunidadList key={categoria.categoria} props={categoria} />)
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComunidadContainer