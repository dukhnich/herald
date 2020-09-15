import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "../../../shared/components/Avatar/Avatar";
import {gql} from "graphql-request";
import API from "../../../API";
import {connect} from "react-redux";

const createMutation = gql`
  mutation addUser($_id: ID!, $title: String, $members: [UserInput]) {
    ChatUpsert(chat: {_id: $_id, title: $title, members: $members }) {
      _id
      members {_id nick}
    }
  }
`;

const createMutation1 = gql`
  mutation changeUser ($_id: ID!, $nick: String, $chats: [ChatInput]) {
    UserUpsert(user: {_id: $_id, nick: $nick, chats: $chats }) {
      _id
      nick
      chats {_id title}
    }
  }
`;

const ChatItem = ({chat, isActive, currentUser}) => {
    const { title, _id, members } = chat;
    const mutateUser = (data, isNeedRerender = true) => {
        console.log(data)
        API.request(createMutation1
            , {_id:currentUser._id, chats: [...currentUser.chats, {_id: _id}]}
        )
            .then((r) => {
                console.log(r)
                // isNeedRerender && onChangeData();
            })
            .catch(e => {
                console.log(e);
            });
    }


    const addChat = (e) => {
        e.preventDefault();
        const chats = currentUser.chats ? [...currentUser.chats, {_id: _id}] : [{_id: _id}]
        const data = {"_id": currentUser._id, "chats": chats}

        members.push({"_id": currentUser._id})

        // console.log("I ", currentUser._id, currentUser.chats, "chat ", _id)
        // mutateUser({"_id": currentUser._id, "chats": chats})
    }

    return (
        <>
            <Avatar data={chat} isBig={false} isUser={false}/>
            <Link
                to={`/chats/${_id}`}
                className={"flex-grow-1 ml-3"}
            >
                {title}
            </Link>
            {isActive ?
                <button
                    onClick={addChat}
                    aria-readonly={"add chat"}
                    type ="button"
                    className={"custom-button round-button ml-3"}>
                    +
                </button>
                : <div className={"brown-text small"}>Members: {members.length}</div>
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
});

export default connect(mapStateToProps)(ChatItem);