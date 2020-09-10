import React from "react";
import {login} from "../../../services/login";
import InputGroup from "./InputGroup";
import FormFooter from "./FormFooter";
import {Link} from "react-router-dom";

const useForm = (initialData) => {
    const [values, setValues] = React.useState(initialData);
    // const values = React.useRef();

    const onChange = (e) => {
        const target = e.target;
        setValues((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    React.useEffect(() => {
        if (isReady) {
            return
        }
        timeoutId.current = setTimeout(() => setReady(true), delay);
        return cancel
    }, [delay, isReady]);

    // const reset = () => {
    //         setReady(false);
    //     }
    // ;
    // return [isReady, cancel, reset];
};


const Form = ({ onSubmitHandler, children, initialValues = {}}) => {
    const [values, setValues] = useForm(initialValues);

    // const [values, setValues] = React.useState(initialValues);
    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler();
    };

    const onChange = (e) => {
        const target = e.target;
        setValues((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };
    return (
        <form onSubmit={onSubmit}>
            {
                children
            }
        </form>
    );
};

export default Form