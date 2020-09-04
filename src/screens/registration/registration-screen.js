import React from "react";
import API from "./../../API";
import { gql } from "graphql-request";
import { connect } from "react-redux";
import Spinner from "../../shared/components/Spinner";
import InputGroup from "../../shared/components/form/InputGroup";
import FormFooter from "../../shared/components/form/FormFooter";
import NavBar from "../../shared/components/navigation/NavBar";

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
    const onSubmit = (e) => {
        console.log(values)
        e.preventDefault();
        API.request(createMutation, {...values}).then(console.log);
    };

    const onChange = (e) => {
        const target = e.target;
        setValues((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    return <>
        <NavBar />
        <div className={"black-shadow"}>
            <div className={"container-small"}>
                <h1 className={"mb-4"}>Sign Up</h1>

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
                        <div onClick={onSubmit} className={"triangle triangle-right"}/>
                        <h5 className={"subheader"}>
                            Create profile
                        </h5>
                    </FormFooter>
                </form>
            </div>
        </div>
    </>
}

export default CreateUserForm
