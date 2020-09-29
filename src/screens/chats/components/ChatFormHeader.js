import React from "react";
import Avatar from "../../../shared/components/Avatar/Avatar";
import uploadFile from "../../../shared/helpers/uploadFile";

const ChatFormHeader = ({addAvatar}) => {
    const [avatar, setAvatar] = React.useState(null)
    async function uploadPhoto(event) {
        event.preventDefault();
        const file = event.target.files[0];
        if (file.type && file.type.includes("image")) {
            const newAvatar = await uploadFile(file);
            setAvatar(newAvatar)
            addAvatar(newAvatar._id);
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