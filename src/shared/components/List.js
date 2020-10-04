import React from "react";
import ChatItem from "./ChatItem/ChatItem";
import UserItem from "./UserItem/UserItem";
import MessageItem from "../../screens/chat/components/messages/MessageItem";
import NotificationItem from "./navigation/NotificationItem";

const Item = ({item, activeItem, onClick}) => {
    const type = item.members ? "chat"
        : item.nick ? "user"
        : item.notifications ? "notification" : "";

    const liOnClick = (e) => {
        e.stopPropagation();
        onClick(item._id)
    }

    const itemType = (type) => {
        switch (type) {
            case "chat":
                return (
                    <ChatItem
                        isActive={(activeItem === item._id)}
                        chat={item}
                    />
                );
            case "user":
                return (
                    <UserItem
                        isActive={(activeItem === item._id)}
                        user={item}
                    />
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

    return (
        <li
            onClick={liOnClick}
            className={
                (activeItem === item._id ? "active-item " : "") +
                "py-4 list-group-item d-flex black-link justify-content-between align-items-center"
            }
        >
            {itemType(type)}
        </li>
    )
}

const List = ({items}) => {
    const [activeItem, setActive] = React.useState(null);

    const changeActive = (id) => {
        setActive(prev => prev === id ? null : id)
    }


    return (

        <ul className={"list-group search-list w-100 mw-100"}>
            {items.map((item) => (
                    <Item
                        key={item._id}
                        item={item}
                        onClick={changeActive}
                        activeItem={activeItem}
                    />
            ))}
        </ul>
    );
};

// List.defaultProps = {
//     isRemoveButton: false,
//     isAddButton: true
// };

export default List;
