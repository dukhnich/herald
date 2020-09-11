import React from "react";
import API from "./../../API";
import { gql } from "graphql-request";
import { connect } from "react-redux";
import Spinner from "../../shared/components/Spinner";
import InputGroup from "../../shared/components/form/InputGroup";
import FormFooter from "../../shared/components/form/FormFooter";
import NavBar from "../../shared/components/navigation/NavBar";
import {Redirect} from "react-router-dom";

const createMutation = gql`
  mutation create($login: String!, $password: String!, $nick: String!) {
    UserUpsert(user: { login: $login, password: $password, nick: $nick }) {
      login
      nick
    }
  }
`;

const CreateUserForm = () => {
    const [values, setValues] = React.useState({});
    const [status, setStatus] = React.useState(null);
    if (status === "resolved") {
        return <Redirect to="/login" />;
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        setStatus("pending");
        API.request(createMutation, values)
            .then(result => {
                console.log(result)
                setStatus("resolved")
            })
            .catch(e => {
                console.log(e);
                setStatus("rejected")
            });
    };

    const onChange = (e) => {
        const target = e.target;
        setValues((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    return <>
        <NavBar text = {"Registration"}/>
        <div className="banner">
            <picture className={"cover"}>
                <img src="images/eilean-donan-view.jpg" alt="background"/>
            </picture>
        </div>
        <h1 className={"m-4"}>Sign Up</h1>

        <div className={"black-shadow"}>
            <div className={"container-small"}>
                <form onSubmit={onSubmit}>
                    <div className={"form-body"}>

                        <InputGroup label={"Login"}>
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
                        <InputGroup label={"Password"}>
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
                <div className="mt-5 text-center">
                    {status === "rejected" ? (
                        <span className="alert alert-danger">Something went wrong</span>
                    ) : null}
                </div>
            </div>
        </div>
    </>
}

export default CreateUserForm
