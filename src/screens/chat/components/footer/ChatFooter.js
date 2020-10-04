import React from "react";
import SendBtn from "./SendBtn";
import AttachButton from "./AttachButton";
import {connect} from "react-redux";
import {findThisMessage} from "../../FindThisMessage";

const ChatFooter = ({currentChat, currentMessages, dispatch}) => {
    const thisMsg = findThisMessage(currentMessages, currentChat._id)

    const [attach, setAttach] = React.useState([]);

    const [needClear, setClear] = React.useState(false);

    const onChange = (e) => {
        dispatch({
            type: "newMessage/changeInfo",
            payload:{text: e.target.value, chat: {_id: currentChat._id}}
        })
    };

    const onSend = () => {
        setClear(false)
    }

    const clearData = () => {
        setClear(true)
    }

    return (
        <div className={"black-footer pl-3 pt-3 pb-0 pr-5 d-flex align-items-start"}>
            <SendBtn/>
            <AttachButton
                attach={attach}
                setAttach={setAttach}
                needRemove={needClear}
                onSend={onSend}
            />
            {thisMsg.replyTo && Object.keys(thisMsg.replyTo).length ? (
                <div className={"replyed-message small ml-2 flex-shrink-0 p-2"}>
                    <p className={"blue-text text-break font-weight-bold m-0"}>{thisMsg.replyTo.owner.nick}</p>
                    <pre className={"black-text text-truncate m-0 d-block mw-100"}>{thisMsg.replyTo.text}</pre>
                </div>

                )
                : null
            }
            <textarea
                className={"black-input pt-2 ml-3 h-75 flex-grow-1 mr-5"}
                placeholder={"Type message"}
                name={"msg"}
                value={thisMsg.text}
                onChange={onChange}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentChat: state.currentChat.currentChat,
    currentMessages: state.currentMessages.currentMessages,
});

export default connect(mapStateToProps)(ChatFooter);