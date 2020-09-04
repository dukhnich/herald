import React from "react";
import { string } from 'prop-types';

const InputGroup = ({label, children}) => {
    return <div className="form-group">
        <label>{label}</label>
        {children}
    </div>
}

InputGroup.propTypes = {
    label: string
}

export default InputGroup