
const Icon = ({icon, className='material-icons', customIconClassName='', action=undefined}) => {
    let style = `${className} ${customIconClassName}`
    return(
        <>
            {
                action !== undefined ? (
                    <span className={style} onClick={()=>{action()}}>{icon}</span>
                ) : (
                    <span className={style} role="button">{icon}</span>
                )
            }
        </>
    )
}

export default Icon