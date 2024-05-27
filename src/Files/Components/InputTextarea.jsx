import Icon from "../../UtilComponents/Icon"

const InputTextarea = ({ name, label, value, placeholder, completed = false, popover = false, popoverText = 'Texto de ayuda', handleChange, maxLength }) => {
    return (
        <>
            <div className={`form__input mb-5p ${!completed ? 'state-warning' : ''}`}>
                <label htmlFor="test" className="fw-300">{label}
                    {popover &&
                        <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content=
                            {popoverText}>
                            <Icon icon={'help'}></Icon>
                        </span>} </label>
                <textarea onChange={handleChange} name={name} id={name} maxLength={maxLength} value={value} placeholder={placeholder}></textarea>
                {/* {!completed &&
                    <div className="conditions">
                        <Icon icon={'priority_high'}></Icon>
                        <p>Campo vacío</p>
                    </div>} */}
            </div>
        </>
    )
}

export default InputTextarea