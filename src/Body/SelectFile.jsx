import { useEffect, useState } from 'react'
import { SS_files } from '../utils/files'
import Icon from '../UtilComponents/Icon';
import CartaCompromiso from '../Files/GeneralForm';

const fileKeys = Object.keys(SS_files);

const SelectFile = () => {
    const [file, setFile] = useState(fileKeys[0])

    const [filemode, setFileMode] = useState('selectfile')

    function handleSelectChange(event) {
        setFile(event.target.value)
    }

    useEffect(() => {
        console.log(file);
    }, [file])
    return (
        <div className="createfile">
            {filemode === 'selectfile' ? (
                <div className="selectfile">
                    <h3>Selecciona tu documento</h3>
                    <select defaultValue={file} name="file" id="file" onChange={handleSelectChange}>
                        {fileKeys.map((_elem, index) => {
                            return <option
                                key={SS_files[fileKeys[index]].name}
                                value={fileKeys[index]}
                            >
                                {SS_files[fileKeys[index]].name}
                            </option>
                        })}
                    </select>

                    <div className="card">
                        <Icon icon={'help'} customIconClassName='card__help text-light'></Icon>
                        <h4 className='card__title text-light'>{SS_files[file].name}</h4>
                        <p className="card__description text-light">{SS_files[file].description}</p>
                        <div className="card__owner">
                            <span>
                                <Icon icon={'face'} customIconClassName='text-light'></Icon>
                            </span>
                            <p className='text-light'>Bisondocx</p>
                        </div>
                    </div>

                    <span onClick={() => setFileMode('fillfile')} className='btn btn__tofilldoc'>
                        <p>Llenar documento</p>
                        <Icon icon={'arrow_right'}></Icon>
                    </span>
                </div>
            ) : (
                <div className="fillfile">
                    <h3>Llenar tu documento</h3>

                    {/* Aqui se renderizan los diferentes formularios */}
                    <CartaCompromiso></CartaCompromiso>

                    <span onClick={() => setFileMode('selectfile')} className='btn btn__toselectdoc'>
                        <Icon icon={'arrow_left'}></Icon>
                        {/* <p>Seleccionar documento</p> */}
                    </span>
                </div>
            )}
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Accordion Item #3
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectFile