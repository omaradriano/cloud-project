import { useEffect, useState } from "react";
import { generateDocument } from "../../utils/forms_functions"

const CartaCompromiso = ({ componentName, auth }) => {
    return (
        <>
            <div className={`dropdown`}>
                <a className={`btn btn-secondary dropdown-toggle`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Descargar
                </a>

                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => generateDocument(componentName, 'pdf', auth)}>PDF</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => generateDocument(componentName, 'docx', auth)}>DOCX</a></li>
                </ul>
            </div>
        </>
    )
}

export default CartaCompromiso