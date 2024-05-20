import { useEffect } from "react"
import GeneralForm from "../Files/GeneralForm"
import { serverDomain } from "../config"

const Files = () => {
    return (
        <>
            <div className="files">
                <GeneralForm></GeneralForm>
            </div>
        </>
    )
}

export default Files