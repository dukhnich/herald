import React from "react";
import Icon from "../../../../shared/icon";
import {connect} from "react-redux";

const ForwardButton = ({msg, dispatch, currentChat}) => {
    const onForward = () => {
        dispatch({
            type: "newMessage/changeInfo",
            payload:{forwarded: msg, chat: {_id: currentChat._id}}
        })    }
    return (
        <div className={"mr-3"}>
            <button
                className={"custom-button mr-1 p-1"}
                type={"button"}
                onClick={onForward}
            >
                <Icon
                    icon="forward"
                    color={"#00a0ff"}
                    size={"1.5em"}
                />
            </button>
            Forward
        </div>
    )
}


const mapStateToProps = (state) => ({
    currentChat: state.currentChat.currentChat,
});

export default connect(mapStateToProps)(ForwardButton);