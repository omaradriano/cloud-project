
const Icon = ({icon, className='material-icons', customIconClassName=''}) => {
    let style = `${className} ${customIconClassName}`
    return(
        <>
            <span className={style}>{icon}</span>
        </>
    )
}

export default Icon