import React from "react";
import ChatItem from "./ChatItem/ChatItem";
import UserItem from "./UserItem/UserItem";
import MessageItem from "./MessageItem";
import NotificationItem from "./navigation/NotificationItem";

const Item = ({item, activeItem}) => {
    const type = item.members ? "chat"
        : item.nick ? "user"
        : "notification";

    switch (type) {
        case "chat":
            return (
                <ChatItem isActive={(activeItem === item._id)} chat={item}/>
            );
        case "user":
            return (
                <UserItem isActive={(activeItem === item._id)} user={item}/>
            );
        case "message":
            return (
                <MessageItem isActive={(activeItem === item._id)} message={item}/>
            );
        case "notification":
            return (
                <NotificationItem isActive={(activeItem === item._id)} chat={item}/>
            );
        default:
            return null;
    }
}

const List = ({ items}) => {
    const [activeItem, setActive] = React.useState(null);

    return (

        <ul className={"list-group search-list"}>
            {items.map((item) => (

                <li onClick={() => setActive(item._id)}
                    key={item._id}
                    className={
                        (activeItem === item._id ? "active-item " : "") +
                        "py-4 list-group-item d-flex black-link justify-content-between align-items-center"
                    }
                >
                    <Item item={item} activeItem={activeItem} />

                </li>
            ))}
        </ul>
    );
};

List.defaultProps = {
    isChats: false
};

export default List;
