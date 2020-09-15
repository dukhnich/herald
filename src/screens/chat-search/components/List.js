import React from "react";
import ChatItem from "./ChatItem";
import UserItem from "./UserItem";
const List = ({ items, isChats}) => {
    const [activeItem, setActive] = React.useState(null);

    return (

        <ul className={"list-group search-list mt-4"}>
            {items.map((item) => (

                <li onClick={() => setActive(item._id)}
                    key={item._id}
                    className={
                        (activeItem === item._id ? "active-item " : "") +
                        "py-4 list-group-item d-flex black-link justify-content-between align-items-center"
                    }
                >
                    {item.members ?
                        <ChatItem isActive={(activeItem === item._id)} chat={item}/>
                        : <UserItem isActive={(activeItem === item._id)} user={item}/>
                    }
                </li>
            ))}
        </ul>
    );
};

List.defaultProps = {
    isChats: false
};

export default List;
