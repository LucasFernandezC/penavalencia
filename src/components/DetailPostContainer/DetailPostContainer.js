
import { useParams, Link } from "react-router-dom";
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
    const [existImages, setExistImages] = useState(false)
    const [newComment, setNewComment] = useState()
    const [image, setImage] = useState([])



    useEffect(() => {
        getPost()
        setImage([])
    }, [])

    useEffect(() => {
        getPost()
        setImage([])
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
                        data.urlImg.length > 0 ? setExistImages(true) : setExistImages(false)
                        console.log(data)
                        setPost(data)
                    })
                    .catch(() => {
                        console.log("sali por error  ")
                    })

            }
            )
        
    }

    const agregarComentario = () => {
        setShowModal(true)
    }

    const submitPost = async (e) => {
        e.preventDefault()
        let addNewComment = {}
        addNewComment = {
            _id: postid,
            user: userCredentials._id,
            username: userCredentials.name,
            comment: newComment,
            urlImgs: [],
            commentdate: new Date(Date.now())
        }
        
        if (image.length!=0) {
            addNewComment.urlImgs = await uploadImage()
        } 
        insertComment(addNewComment)
        getPost()
        console.log("submitie post ", addNewComment)
        
        setShowModal(false)



    }

    const insertComment = async (data) => {
        
        var post = 'http://localhost:4000/inserComment/' + postid
        var datajson = JSON.stringify(data)
        return fetch(post, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: datajson,
        })

            .then((response) => {
                console.log("esta es la respuesta ", response)

            })

    }
    const uploadImage = async () => {
        console.log("entre a subir la imagen", image)
        var usr = 'http://localhost:4000/post/uploadfile'
        return fetch(usr, {
            method: 'POST',
            body: image,
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json.data)
                return json.data.url

            })

    }

    const handleChange = (e) => {
        setNewComment(e.target.value)
    }

    const changeHandler = (event) => {

        const data = new FormData();
        if (event.target.files.length > 1) {
            for (var i = 0; i < event.target.files.length; i++) {
                data.append("file", event.target.files[i])
            }
        } else {
            data.append("file", event.target.files[0])
        }

        //data.append("file", event.target.files[0])
        return setImage(data)

    };


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
                                    <Link to={`/comunidad/${category}`} className="post-volver"><h2 className="post-volver"><i class="bi bi-arrow-left-square"></i></h2></Link>
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
                                                <p className="post-item-msj">{post.msj}</p>
                                                {existImages && post.urlImg.map((img) => {
                                                    return (
                                                        <img src={img} className="post-item-img"></img>
                                                    )
                                                })}

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
                                                        autoFocus="true"

                                                    />
                                                    <input type="file" name="file" multiple="true" onChange={changeHandler} />
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
                                            <div className=" forum-container">
                                                <CommentPost key={comment.commentdate} props={comment} />
                                                <div className="row">
                                                    <div className="col-md-12 post-item-button">
                                                        <button onClick={agregarComentario}> Agregar Comentario  </button>
                                                    </div>
                                                </div>
                                            </div>
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