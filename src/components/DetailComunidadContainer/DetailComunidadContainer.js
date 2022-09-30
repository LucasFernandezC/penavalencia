import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailComunidadList from "../DetailComunidadList/DetailComunidadList";
import "./DetailComunidadContainer.scss"
import ComWidget from "../ComWidget/ComWidget";

const DetailComunidadContainer = () => {
    const { category } = useParams()
    const [cantidadPost, setCantidadPost] = useState()
    const [nuevoPost,setNuevoPost] = useState(false)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        console.log("entre a buscar las cates ",nuevoPost)
        getPosts().then((data) => {
            console.log("traje las cates", data)
        })
    }, [nuevoPost])

    const getPosts = async () => {
        let array = []
        let resultado
        let url = "http://localhost:4000/getDataPosts/" + category
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
                        setCantidadPost(data.length)
                        setPosts(data)

                    })
                    .catch(() => {
                        console.log("sali por error  ")
                    })

            }
            )
        return resultado
    }

    console.log(category)
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="wrapper wrapper-content animated fadeInRight">
                            
                                <div className="ibox-content m-b-sm border-bottom">
                                <div className="row">
                                    <div className="forum-title-display col-lg-11">
                                        <div className="forum-title">
                                            <h3>Categoria {category.toUpperCase()} </h3>
                                            <div className="pull-right forum-desc">
                                                <small>Total posts: {cantidadPost}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-1">
                                        <ComWidget setNuevoPost={setNuevoPost} />
                                    </div>
                                </div>
                                    
                                </div>
                                
                            <div className="ibox-content forum-container">
                                {posts.map((post) => {
                                    return (
                                        <DetailComunidadList key={post._id} props={post} />
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailComunidadContainer