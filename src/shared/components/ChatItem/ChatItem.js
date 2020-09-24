import React from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import {gql} from "graphql-request";
import {connect} from "react-redux";
import RoundButton from "./RoundButton";
import Icon from "../../icon";

const deleteChat = gql`
  mutation chatDelete ($_id: ID!) {
    ChatDelete(chat: {_id: $_id}) {
      _id
      title
    }
  }
`;

const ChatItem = ({chat, isActive, currentUser, notifications}) => {
    const { title, members, _id } = chat;
    const isChatOfCurrentUser = currentUser.chats.reduce((prev,chat) =>
        chat._id === _id ? true : prev
        , false)
    const countNotifications = notifications.reduce((prev,chat) =>
            chat._id === _id ? chat.notifications.length : prev
        , 0)

    return (
        <>
            <Avatar data={chat} isBig={false} isUser={false}/>

            <div className={"flex-grow-1 ml-3"}>
                {title}
                {isChatOfCurrentUser && countNotifications ? (
                        <span className={"ml-3"}>
                            <Icon color={"#ffbdb8"} icon="alert" />
                            <span className={"rose-text ml-1"}>{countNotifications}</span>
                        </span>
                    )
                    : null
                }
            </div>
            {isActive ?
                <RoundButton chat ={chat} user = {currentUser}/>
            : <div className={"brown-text small"}>Members: {members ? members.length : 0}</div>
            }

        </>
    );
};

ChatItem.propTypes = {
    chat: PropTypes.shape({
        title: PropTypes.string,
        avatar: PropTypes.object,
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    isActive: PropTypes.bool
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    notifications: state.notifications.chats,

});

export default connect(mapStateToProps)(ChatItem);