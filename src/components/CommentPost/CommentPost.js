import "./CommentPost.scss"

const CommentPost = (props) => {
    
    return (
        <>
            <div className="ibox-content forum-container">
                <div className="row post-item-detail">
                    <div className="row">
                        <div className="col-md-12 form-comment-head">
                            <p><strong>Comentario de:</strong> {props.props.username}</p>
                            <p><strong>Fecha comentario: </strong>{props.props.commentdate}</p>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <p className="post-item-msj">{props.props.comment}</p>
                        {props.props.urlImgs.map((img)=> {
                            return(
                                <img src={img} key={img} className="post-item-img"></img>
                            )
                        })}
                    </div>
                </div>
                
            </div>
        </>
    )

}

export default CommentPost