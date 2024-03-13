import { useState } from 'react'
import {SS_files} from '../../utils/files'
import { Link } from 'react-router-dom';

const fileKeys = Object.keys(SS_files);

const SelectFile = () => {

    const [file, setFile] = useState(fileKeys[0])

    function handleSelectChange(event){
        setFile(event.target.value)
    }
    return (
        <>
            <div className="selectFile">
                <h3>Selecciona tu archivo</h3>
                <select defaultValue={file} name="file" id="file" onChange={handleSelectChange}>
                    {fileKeys.map((_elem, index)=>{
                        return <option 
                                    key={SS_files[fileKeys[index]].name} 
                                    value={fileKeys[index]}
                                >
                                    {SS_files[fileKeys[index]].name}
                                </option>
                    })}
                </select>

                <div className="imgFileContainer">
                    <img src={SS_files[file].filename} alt="Imagen de documento" />
                </div>

                <Link className='btn' to={'/linkdellenado'}>Aceptar y llenar documento</Link>
                {/* <input className='btn' type="button" value="Aceptar y llenar documento" /> */}
            </div>
        </>
    )
}

export default SelectFile