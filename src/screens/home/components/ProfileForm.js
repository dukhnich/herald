import React from "react";
import API from "../../../API";
import InputGroup from "../../../shared/components/form/InputGroup";
import FormFooter from "../../../shared/components/form/FormFooter";
import {gql} from "graphql-request";
import {connect} from "react-redux";
import ProfileHeader from "./ProfileHeader";
import {logout} from "../../../services/login";

const addUserInfo = gql`
  mutation changeUser($_id: ID!, $login: String, $password: String, $nick: String, $avatar: MediaInput) {
    UserUpsert(user: {_id: $_id, login: $login, password: $password, nick: $nick, avatar: $avatar}) {
      login
      nick
    }
  }
`;


const deleteUser = gql`
  mutation userDelete ($_id: ID) {
    UserDelete(user: {_id: $_id}) {
      _id
    }
  }
`;

const ProfileForm = ({currentUser, onChangeData, dispatch}) => {
    const [values, setValues] = React.useState(currentUser);

    const mutateUser = (data, isNeedRerender = true) => {
        API.request(addUserInfo
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

    const deleteAccount = (e) => {
        e.preventDefault();
        API.request(deleteUser
            , {_id: currentUser._id}
        )
            .then(() => {
                dispatch(logout());
            })
            .catch(e => {
                console.log(e);
            });
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
            <InputGroup label={"Nick"}>
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
                className={"btn btn-sm btn-outline-primary mb-2"}>
                Change nick
            </button>
            <button
                onClick={deleteAccount}
                className={"btn btn-danger small mt-4"}
            >
                Delete account
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
                        className={"custom-button"}
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
