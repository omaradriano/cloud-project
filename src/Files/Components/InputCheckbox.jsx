import Icon from "../../UtilComponents/Icon"

const InputCheckbox = ({ label, completed = false, popover = false, popoverText = 'Texto de ayuda', handleChange, isChecked }) => {
    return (
        <>
            <div className={`form__input mb-5p ${!completed ? 'state-warning' : ''}`}>
                <label htmlFor="test" className="fw-300">{label}
                    {popover &&
                        <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content=
                            {popoverText}>
                            <Icon icon={'help'}></Icon>
                        </span>} </label>
                <input type="checkbox" checked={isChecked} onChange={handleChange}/>
            </div>
        </>
    )
}

export default InputCheckbox