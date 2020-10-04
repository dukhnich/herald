import React from "react";
import MessageItem from "./MessageItem";
import Icon from "../../../../shared/icon";

const MessageList = ({messages, newMsg}) => {
    const ul = React.useRef();


    React.useEffect(()=>{
        ul.current.scrollTop = ul.current.scrollHeight;
    },[messages, newMsg])

    return (

        <ul className={"list-group message-list"} ref={ul}>
            {messages.map((msg) => (
                <MessageItem message={msg} key={msg._id}/>
            ))}
            {newMsg.length ? (<>
                    <li>
                        <h4 className={"subheader text-center mt-3"}>
                            <Icon color={"#ffffff"} icon="alert" />
                            <span className={"ml-2"}>New messages</span>
                        </h4>
                    </li>
                    {newMsg.map((msg) => (
                        <MessageItem message={msg} key={msg._id}/>
                    ))}
                </>)
                : null
            }
        </ul>
    );
};


export default MessageList