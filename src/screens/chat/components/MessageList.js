import React from "react";
import MessageItem from "../../../shared/components/MessageItem";
import {connect} from "react-redux";
import {removeNotifications} from "../../../services/notifications";

const MessageList = ({chat, notifications, onChangeData}) => {
    const {messages, _id} = chat;
    const [activeItem, setActive] = React.useState(null);
    const ul = React.useRef();
    const [newMessages, setNewMessages] = React.useState([])
    const thisChatNewMessages = notifications.filter(msg => msg.chat._id === _id)

    React.useEffect(()=>{
        ul.current.scrollTop = ul.current.scrollHeight;
        if (thisChatNewMessages.length) {

            const timeoutId = setTimeout(() => {
                    console.log("start remove")

                    removeNotifications(thisChatNewMessages);

                    onChangeData()
                },
                3000)
            return () => clearTimeout(timeoutId)
        }
    },[notifications])

    return (

        <ul className={"list-group message-list"} ref={ul}>
            {messages.map((msg) => (

                <li onClick={() => setActive(msg._id)}
                    key={msg._id}
                    className={
                        (activeItem === msg._id ? "1 " : "") +
                        "py-3"
                    }
                >
                    <MessageItem message={msg} activeItem={activeItem} />
                </li>
            ))}
            {thisChatNewMessages.length ? (<>
                    <li><h1>New messages</h1></li>
                    {thisChatNewMessages.map((msg) => (

                        <li onClick={() => setActive(msg._id)}
                            key={msg._id}
                            className={
                                (activeItem === msg._id ? "1 " : "") +
                                "py-3"
                            }
                        >
                            <MessageItem message={msg} activeItem={activeItem} />
                        </li>
                    ))}
                </>)
                : null
            }
        </ul>
    );
};


const mapStateToProps = (state) => ({
    notifications: state.notifications.notifications,
});

export default connect(mapStateToProps)(MessageList);