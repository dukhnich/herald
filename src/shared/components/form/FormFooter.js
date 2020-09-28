import React from "react";


const FormFooter = ({children}) => {
    return <div className={"form-footer"}>
        <div className={"form-footer-wrapper d-flex flex-wrap justify-content-between"}>
            {children}
        </div>
    </div>
}

export default FormFooter