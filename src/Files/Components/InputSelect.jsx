import Icon from "../../UtilComponents/Icon"

const InputSelect = ({ name, label, value, completed = false, popover = false, popoverText = 'Texto de ayuda', handleChange, renderArray }) => {
    return (
        <>
            <div className={`form__select mb-p5 ${!completed ? 'state-warning':''}`}>
                <label htmlFor="select_test" className="">{label}
                    {popover && <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content={popoverText}>
                        <Icon icon={'help'}></Icon>
                    </span>} </label>
                <select className="form-select" aria-label="Default select example" id={name} name={name} value={value} onChange={handleChange}>
                    <option value={''}>Selecciona una opcion</option>
                    {renderArray}
                </select>
                {/* {!completed &&
                    <div className="conditions">
                        <Icon icon={'priority_high'}></Icon>
                        <p>Campo vacío</p>
                    </div>} */}
            </div>
        </>
    )
}

export default InputSelect