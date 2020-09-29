import React from "react";
import {connect} from "react-redux";
import Avatar from "../../../shared/components/Avatar/Avatar";
import uploadFile from "../../../shared/helpers/uploadFile";

const ProfileHeader = ({currentUser, changeUserData}) => {
    const {login, avatar,_id} = currentUser;

    async function uploadPhoto(event) {
        event.preventDefault();
        const file = event.target.files[0];
        if (file.type && file.type.includes("image")) {
            const newAvatar = await uploadFile(file);
            changeUserData({
                "_id": _id,
                "avatar": {_id: newAvatar._id, userAvatar: {"_id": _id}}
            });
        }
    }

    return (
            <div className={"d-flex justify-content-between"}>
                <Avatar data={currentUser} />
                <div className={"mx-4 d-flex flex-column align-items-end justify-content-center"}>
                    <h1 className={"medium-header text-break text-right"}>{login}</h1>
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