import React from "react";
import {ENDPOINT} from "../../../API";
import {connect} from "react-redux";
import Avatar from "../../../shared/components/Avatar/Avatar";

const ProfileHeader = ({currentUser, changeUserData}) => {
    const {login, avatar,_id} = currentUser;
    const form = React.useRef(null);

    async function uploadPhoto(event) {
        event.preventDefault();
        //
        const file = event.target.files[0];
        if (file.type && file.type.includes("image")) {
            const formData = new FormData();
            const token = localStorage.getItem("token");
            formData.append("media", file);
            fetch(`${ENDPOINT}/upload`, {
                method: "POST",
                headers: token
                    ? { Authorization: "Bearer " + token }
                    : {},
                body: formData
            })
                .then((res) => res.json())
                .then((json) => {
                        console.log("UPLOAD RESULT", json);
                        changeUserData({"_id": _id, "avatar": {_id: json._id}});
                    }
                );
        }


    }

    return (
            <div className={"d-flex justify-content-between"}>
                <Avatar user={currentUser} />
                <div className={"mx-4 d-flex flex-column align-items-end justify-content-center"}>
                    <h1 className={"big-header text-break text-right"}>{login}</h1>
                    <label className={"underline underline-blue blue-text"}>
                        {avatar ? "Change avatar" : "Add avatar"}
                        <input
                            onInput={uploadPhoto}
                            className={"custom-file-input"}
                            type={"file"}
                            name={"media"}
                        />
                    </label>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(ProfileHeader);