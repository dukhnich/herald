import React from "react";
import MessageItem from "../../../shared/components/MessageItem";
import Icon from "../../../shared/icon";

const MessageList = ({messages, newMsg}) => {
    const [activeItem, setActive] = React.useState(null);
    const ul = React.useRef();


    React.useEffect(()=>{
        ul.current.scrollTop = ul.current.scrollHeight;
    },[messages, newMsg])

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
            {newMsg.length ? (<>
                    <li>
                        <h4 className={"subheader text-center mt-3"}>
                            <Icon color={"#ffffff"} icon="alert" />
                            <span className={"ml-2"}>New messages</span>
                        </h4>
                    </li>
                    {newMsg.map((msg) => (

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


export default MessageList