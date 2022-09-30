import { Link } from "react-router-dom";

const ComunidadList = (props) => {

    return (
        <>
            <div className="forum-item active">
                <div className="row">
                    <div className="col-md-11">
                        <div className="forum-icon">
                            <i className="fa fa-shield"></i>
                        </div>
                        <Link to={`/comunidad/${props.props.categoria}`}><a className="forum-item-title">{props.props.categoria}</a></Link> 
                        <div className="forum-sub-title">Descripcion de la categoria</div>
                    </div>
                    <div className="col-md-1 forum-info">
                        <span className="views-number">
                            {props.props.cantidad}
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

export default ComunidadList;