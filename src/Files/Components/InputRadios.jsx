import Icon from "../../UtilComponents/Icon"

const InputRadios = ({ name, label, value, completed = false, popover = false, popoverText = 'Texto de ayuda', handleChange, options = {}, keyword }) => {

    const { optionValues, optionKeys } = options

    return (
        <>
            <div className="form__radios mb-5p">
                <label htmlFor="select_test" className="">{label}
                    {popover && <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content={popoverText}>
                        <Icon icon={'help'}></Icon>
                    </span>} </label>
                <div className="formdata__radiosgroup">
                    {optionValues.map((elem, index) => {
                        return (
                            <div key={index} className="form-check">
                                <input className="form-check-input"
                                    type="radio"
                                    name={name}
                                    id={`name_${index+1}${keyword}`}
                                    checked={value === optionKeys[index]}
                                    onChange={handleChange} 
                                    value={optionKeys[index]}/>
                                <label className="form-check-label" htmlFor={`name_${index+1}${keyword}`}>
                                    {elem}
                                </label>
                            </div>
                        )
                    })}
                </div>
                {!completed && <div className="conditions">
                    <Icon icon={'warning'}></Icon>
                    <p>Se debe de seleccionar una opción</p>
                </div>}
            </div>
        </>
    )
}

export default InputRadios