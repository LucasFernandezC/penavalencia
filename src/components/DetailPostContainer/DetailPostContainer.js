
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { logContext } from "../../context/LogContext";
import "./DetailPostContainer.scss"
import CommentPost from "../CommentPost/CommentPost";
import Modal from "../Modal/Modal";

const DetailPostContainer = () => {
    const [showModal, setShowModal] = useState(false);
    const { userLogged, userCredentials } = useContext(
        logContext
    );
    const { category, postid } = useParams()
    const [post, setPost] = useState({})
    const [existComments, setExistComments] = useState(false)
    const [newComment, setNewComment] = useState()
    


    useEffect(() => {
        getPost()
    }, [])

    useEffect(() => {
        getPost()
    }, [showModal])

    const getPost = async () => {

        let resultado
        let url = "http://localhost:4000/getDataPosts/" + category + "/" + postid
        console.log("ruta: ", url)
        await fetch(url, {
            method: "GET",
            headers: {
                Accept: "aplication/json"
            }
        })
            .then((respuesta) => {

                respuesta.json()
                    .then((data) => {
                        data.comments.length > 0 ? setExistComments(true) : setExistComments(false)
                        setPost(data)
                    })
                    .catch(() => {
                        console.log("sali por error  ")
                    })

            }
            )
        return resultado
    }

    const agregarComentario = () => {
        setShowModal(true)
    }

    const submitPost = async (e) => {
        e.preventDefault()
        let addNewComment = {
            _id: postid,
            user: userCredentials._id,
            username: userCredentials.name,
            comment: newComment,
            commentdate: new Date(Date.now())
        }
        await insertComment(addNewComment)
        getPost()
        console.log("submitie post ", newComment)
        setShowModal(false)
    }

    const insertComment = (data) =>{
        var post = 'http://localhost:4000/inserComment/' + postid
    var datajson = JSON.stringify(data)
    fetch(post, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: datajson,
    })

      .then((response) => {
        console.log("esta es la respuesta ",response)
        
      })
      
    }

    const handleChange = (e) => {
        setNewComment(e.target.value)
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
                                    <h2>Visualizacion de Post</h2>

                                </div>

                            </div>

                            <div className="ibox-content forum-container">
                                <div className="forum-item active">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="forum-icon">
                                                <i className="fa fa-shield"></i>
                                            </div>
                                            <h3 className="post-item-title">{post.title}</h3>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="forum-icon">
                                                <i className="fa fa-shield"></i>
                                            </div>
                                            <h6 className="post-item-date">{post.creationdate}</h6>
                                        </div>
                                    </div>
                                    <div className="ibox-content forum-container">
                                        <div className="row post-item-detail">
                                            <div className="col-md-12">
                                                <p>{post.msj}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 post-item-button">
                                                <button onClick={agregarComentario}> Agregar Comentario  </button>
                                            </div>
                                        </div>
                                    </div>
                                    {showModal && (

                                        userLogged == true ? (
                                            <Modal title={"Agregar Comentario"} close={() => setShowModal(false)}>
                                                <form action="" id="form" className="form" onSubmit={submitPost}>
                                                    <textarea

                                                        className="form__text"
                                                        name="msj"
                                                        placeholder="Detalle su comentario"
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

                                    {existComments && post.comments.map((comment) => {

                                        return (
                                            <CommentPost key={comment.commentdate} props={comment} />
                                        )
                                    }
                                    )

                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPostContainer