import React from "react";
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../shared/components/Spinner";
import { login } from "../../services/login";
import InputGroup from "../../shared/components/form/InputGroup";
import FormFooter from "../../shared/components/form/FormFooter";
import "./login.css"

const Login = ({ dispatch, authStatus, isLoggedIn}) => {
    const [values, setValues] = React.useState({});
    if (isLoggedIn) {
        return <Redirect to="/" />;
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(values));
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
            <header>
                <img
                    className={"logo-big"}
                    src={"images/logo-rose.png"}
                    alt={"logo"}
                />
                <h1 className={"main-header"}>Herald </h1>
            </header>
            <div className={"black-shadow"}>
                <div className={"container-small"}>
                    <form onSubmit={onSubmit}>
                    <div className={"form-body"}>
                        <InputGroup label={"Login"}>
                            <input
                                type="text"
                                name="login"
                                onChange={onChange}
                                placeholder="Login"
                            />
                        </InputGroup>
                        <InputGroup label={"Password"}>
                            <input
                                onChange={onChange}
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </InputGroup>
                    </div>

                    <FormFooter>
                        <button type={"submit"} className={"icon-button"}>
                            <div className={"triangle triangle-right"}/>
                        </button>

                            <h5 className={"subheader"} onClick={onSubmit}>
                                Login
                            </h5>
                    </FormFooter>
                </form>
                    <p className={"mt-3 text-center"}>
                Not registered?
                <Link className={"underline ml-2 text-white"} to="/registration">
                    Create account
                </Link>
            </p>
                    <div className="my-3">
                        {authStatus === "pending" ? <Spinner /> : null}
                    </div>
                    <div className="mt-5 text-center">
                        {authStatus === "rejected" ? (
                            <span className="alert alert-danger">Something went wrong</span>
                        ) : null}
                    </div>
                </div>
            </div>

    </>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: (state.auth.isAuth),
    authStatus: state.auth.status,
});
export default connect(mapStateToProps)(Login);
