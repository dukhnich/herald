import React from "react";
import Icon from "../../../../shared/icon";
import {connect} from "react-redux";
import {findThisMessage} from "../../FindThisMessage";

const EditButton = ({msg, currentUser, currentChat, currentMessages, dispatch}) => {
    const [isEdited, setEdited] = React.useState(false);
    React.useEffect(() => {
        const thisMsg = findThisMessage(currentMessages, currentChat._id)
        if (thisMsg._id && thisMsg._id !== msg._id && isEdited) {
            setEdited(false)
        }
    },[currentChat._id, currentMessages, isEdited, msg._id])
    
    if (currentUser._id !== msg.owner._id) {
        return null
    }
    
    const onEdit = () => {
        if (isEdited) {
            setEdited(false);
            dispatch({
                type: "newMessage/changeInfo",
                payload: {
                    _id: undefined,
                    text: "",
                    chat: {_id: currentChat._id},
                    attach: []
                }
            })
            return
        }
        setEdited(true)
        dispatch({
            type: "newMessage/changeInfo",
            payload: {
                _id: msg._id,
                chat: {_id: currentChat._id},
                text: msg.text,
                attach: msg.media ? msg.media : []
            }
        })
    }
    return (
        <div className={"mr-3"}>
            <button
                className={"custom-button mr-1 p-1"}
                type={"button"}
                onClick={onEdit}
            >
                <Icon
                    icon="quill"
                    color={isEdited ? "#ffbdb8" : "#00a0ff"}
                    size={"1.5em"}
                />
            </button>
            Edit
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    currentChat: state.currentChat.currentChat,
    currentMessages: state.currentMessages.currentMessages,
});

export default connect(mapStateToProps)(EditButton);