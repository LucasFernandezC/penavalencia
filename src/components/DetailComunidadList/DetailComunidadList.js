import { Link } from "react-router-dom"

const DetailComunidadList = (props) => {

    return(
        <>
        <div className="forum-item active">
                <div className="row post-container">
                    <div className="col-md-11">
                        <div className="forum-icon">
                            <i className="fa fa-shield"></i>
                        </div>
                        <Link to={`/comunidad/${props.props.category}/${props.props._id}`}><a className="forum-item-title">{props.props.title}</a></Link>
                        <div className="forum-sub-title">{props.props.msj}</div>
                    </div>
                    <div className="col-md-1 forum-info">
                        <span className="views-number">
                            {props.props.comments.length}
                        </span>
                        <div>
                            <small>Posts</small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailComunidadList