import React from "react";
import {Redirect} from "react-router-dom";
import API from "../../../API";
import NavBar from "../../../shared/components/navigation/NavBar";
import InputGroup from "../../../shared/components/form/InputGroup";
import FormFooter from "../../../shared/components/form/FormFooter";
import Spinner from "../../../shared/components/Spinner";
import {gql} from "graphql-request";
import {instanceOf} from "prop-types";
import {connect} from "react-redux";
import {loadUser} from "../../../services/userData";
import ProfileHeader from "./ProfileHeader";
import {login, logout} from "../../../services/login";

const createMutation = gql`
  mutation changeUser($_id: ID!, $login: String, $password: String, $nick: String, $avatar: MediaInput) {
    UserUpsert(user: {_id: $_id, login: $login, password: $password, nick: $nick, avatar: $avatar }) {
      login
      nick
    }
  }
`;

const ProfileForm = ({currentUser, onChangeData, dispatch}) => {
    const [values, setValues] = React.useState(currentUser);

    const mutateUser = (data, isNeedRerender = true) => {
        API.request(createMutation
            , data
        )
            .then(() => {
                isNeedRerender && onChangeData();
            })
            .catch(e => {
                console.log(e);
            });
    }

    const changeNick = (e) => {
        e.preventDefault();
        mutateUser({"_id": values._id, "nick": values.nick})
    }

    const changePassword = (e) => {
        e.preventDefault();
        mutateUser({"_id": values._id, "password": values.password}, false);
        dispatch(logout());
    }

    const onChange = (e) => {
        const target = e.target;
        setValues((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    return <form>
        <ProfileHeader
            changeUserData = {mutateUser}
        />
                <div className={"form-body"}>
                    <InputGroup label={currentUser.nick}>
                        <input
                            type="text"
                            placeholder={"New nick"}
                            name="nick"
                            defaultValue={currentUser.nick}
                            onChange={onChange}
                        />
                    </InputGroup>
                    <button
                        onClick={changeNick}
                        type ="button"
                        className={"btn btn-sm btn-outline-primary"}>
                        Change nick
                    </button>
                </div>
                <FormFooter>
                    <div>
                        <label>
                            New password
                            <input
                                className={"blue-input"}
                                type="password"
                                placeholder="New password"
                                name="password"
                                onChange={onChange}
                            />
                        </label>
                        <div className={"mt-4 d-flex justify-content-between align-items-center"}>
                            <button
                                onClick={changePassword}
                                type={"button"}
                                className={"icon-button"}
                            >
                                <div className={"triangle triangle-right"}/>
                            </button>
                            <h5 className={"subheader"}>
                                Change Password
                            </h5>
                        </div>
                    </div>
                </FormFooter>
        </form>
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(ProfileForm);
