import React from "react";
import {ENDPOINT} from "../../../API";
import {connect} from "react-redux";
import Avatar from "../../../shared/components/Avatar/Avatar";

const ChatFormHeader = ({addAvatar}) => {
    const [avatar, setAvatar] = React.useState(null)
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
                        setAvatar(json)
                        addAvatar(json._id);
                    }
                );
        }


    }

    return (
        <div className={"d-flex justify-content-between"}>
            <Avatar data={{avatar: avatar}} isUser={false} />
            <div className={"mx-4 d-flex flex-column align-items-end justify-content-center"}>
                <h1 className={"medium-header text-break text-right"}>New chat</h1>
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

export default ChatFormHeader;