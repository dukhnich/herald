import React from "react";
import API from "./../../API";
import { gql } from "graphql-request";
import Spinner from "../../shared/components/Spinner";
import InputGroup from "../../shared/components/form/InputGroup";
import FormFooter from "../../shared/components/form/FormFooter";
import NavBar from "../../shared/components/navigation/NavBar";
import {Redirect} from "react-router-dom";
import Banner from "./components/Banner";
import passwordValidator from "../../shared/helpers/passwordValidator";
import {connect} from "react-redux";

const createMutation = gql`
  mutation create($login: String!, $password: String!, $nick: String) {
    UserUpsert(user: { login: $login, password: $password, nick: $nick }) {
      _id
      login
      nick
    }
  }
`;

const CreateUserForm = ({isLoggedIn}) => {
    const [values, setValues] = React.useState({});
    const [status, setStatus] = React.useState(null);
    const [error, setError] = React.useState(null);
    if (isLoggedIn) {
        return <Redirect to="/menu" />;
    }

    if (status === "resolved") {
        return <Redirect to="/login" />;
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setStatus("pending");
        try {
            let err = ""
            if (!values.login || !values.password) {
                err += "Empty required fields. "
            }
            const isPasswordValid = passwordValidator(values.password);
            if (true !== isPasswordValid) {
                err += isPasswordValid
            }
            if (err.length) {
                throw new Error("Fail data: " + err)
            }
            await API.request(createMutation, values)
            setStatus("resolved")
        } catch(e) {
            console.log(e.message);
            (e.message.includes("Fail data: ")) ?
                setError (e.message)
                : setError("Something went wrong");
            setStatus("rejected")
        }
    };

    const onChange = (e) => {
        const target = e.target;
        setValues((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    return (
        <>
        <NavBar text = {"Registration"}/>
        <Banner/>
        <div className={"black-shadow"}>
            <div className={"container-small"}>
                <form onSubmit={onSubmit}>
                    <div className={"form-body"}>

                        <InputGroup label={"Login*"}>
                            <input
                                type="text"
                                placeholder="Login"
                                name="login"
                                onChange={onChange}
                            />
                        </InputGroup>
                        <InputGroup label={"Nick"}>
                            <input
                                type="text"
                                placeholder="Nick"
                                name="nick"
                                onChange={onChange}
                            />
                        </InputGroup>
                        <InputGroup label={"Password*"}>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={onChange}
                            />
                        </InputGroup>
                    </div>
                    <FormFooter>
                        <button type={"submit"} className={"custom-button"}>
                            <div className={"triangle triangle-right"}/>
                        </button>
                        <h5 className={"subheader"}>
                            Create profile
                        </h5>
                    </FormFooter>
                </form>
                <div className="my-3">
                    {status === "pending" ? <Spinner /> : null}
                </div>
                <div className="mt-5 text-center d-flex justify-content-center">
                    {status === "rejected" ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : null}
                </div>
            </div>
        </div>
    </>
    )
}

const mapStateToProps = (state) => ({
    isLoggedIn: (state.auth.isAuth),
});
export default connect(mapStateToProps)(CreateUserForm);

