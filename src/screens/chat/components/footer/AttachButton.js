import React from "react";
import Icon from "../../../../shared/icon";
import {connect} from "react-redux";
import {findThisMessage} from "../../FindThisMessage";

const AttachButton = ({currentChat, dispatch, currentMessages}) => {
    const thisMsg = findThisMessage(currentMessages, currentChat._id)
    const addAttach = (event) => {
        const files = event.target.files;
        dispatch({
            type: "newMessage/changeInfo",
            payload:{attach: [...files], chat: {_id: currentChat._id}}
        })
    }

    const removeAttach = () => {
        dispatch({
            type: "newMessage/changeInfo",
            payload:{attach: [], chat: {_id: currentChat._id}}
        })
    }


    return (<>
        <label className={"pt-2"}>
            <Icon
                color={thisMsg.attach && thisMsg.attach.length ? "#ffbdb8" : "#ffffff"}
                icon="camera"
                size={"1.3rem"}
            />
            <input
                onInput={addAttach}
                className={"custom-file-input"}
                type={"file"}
                multiple={true}
                name={"media"}
            />
        </label>
    {thisMsg.attach && thisMsg.attach.length ?
        <button
            onClick={removeAttach}
            type={"button"}
            className={"custom-button pt-2 ml-2"}
        >
            <Icon
                color={"#ffbdb8"}
                icon="cross"
                size={"1rem"}
            />
        </button>
        : null
    }
        </>
    )
}

const mapStateToProps = (state) => ({
    currentChat: state.currentChat.currentChat,
    currentMessages: state.currentMessages.currentMessages,
});

export default connect(mapStateToProps)(AttachButton);