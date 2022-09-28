import "./Modal.scss"
const Modal = ({title, close, children}) => {

    

    const handleClose = () => {

        close(true)
      
        
    }
    
    return(
        <div className="modal-custom " id='modal' >
            <i className="bi bi-x-lg btncerrar" onClick={() => handleClose()}></i>
            <h2>{title}</h2>
            {children}
        </div>
    )
}

export default Modal;