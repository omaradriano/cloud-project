const Modal = ({ component, visible, action }) => {
    
    /**
     * Dentro de este modal se va a cargar el componente que se pase como children
     */
    if (visible) {
        return (
            <>
                <div className="modal">
                    {component}
                </div>
            </>
        )
    }
}

export default Modal