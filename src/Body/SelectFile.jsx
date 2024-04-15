import { useEffect, useState } from 'react'
import { SS_files } from '../utils/files'
import Icon from '../UtilComponents/Icon';
import CartaCompromiso from '../Files/CartaCompromiso';

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

                    <span onClick={()=>setFileMode('fillfile')} className='btn btn__tofilldoc'>
                        <p>Llenar documento</p>
                        <Icon icon={'arrow_right'}></Icon>
                    </span>
                </div>
            ):(
                <div className="fillfile">
                    <h3>Llenar tu documento</h3>

                    {/* Aqui se renderizan los diferentes formularios */}
                    <CartaCompromiso></CartaCompromiso>
                    
                    <span onClick={()=>setFileMode('selectfile')} className='btn btn__toselectdoc'>
                        <Icon icon={'arrow_left'}></Icon>
                        {/* <p>Seleccionar documento</p> */}
                    </span>
                </div>
            )}
        </div>
    )
}

export default SelectFile