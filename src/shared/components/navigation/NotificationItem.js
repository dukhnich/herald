import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const NotificationItem = ({chat, isActive, currentUser}) => {
console.log(chat)
    return (
        <>
        <Link to={"/chats/" + chat._id} className = {"black-text"}>
            <small>{chat.title}</small>
        </Link>
            <div className={"rose-circle"}>{chat.notifications.length}</div>
        </>
    );
};

NotificationItem.propTypes = {
    chat: PropTypes.shape({
        title: PropTypes.string,
        notifications: PropTypes.array.isRequired,
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
    isActive: PropTypes.bool
};

export default NotificationItem