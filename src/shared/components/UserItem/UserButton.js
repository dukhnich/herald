import React from "react";
import {connect} from "react-redux";
import addOrDeleteMember from "../../helpers/addOrDeleteMembers";
import AddButton from "./AddButton";
import Icon from "../../icon";

const UserButton = ({user, chat, currentUser, changeOpen, currentUserChats, dispatch}) => {

    const addToThisChat = (e) => {
        e.preventDefault();
        addOrDeleteMember(dispatch, user._id, chat, true);
    }

    const deleteMember = (e) => {
        e.preventDefault();
        addOrDeleteMember(dispatch, user._id, chat, false);
    }

    if (chat) {
        if (currentUser._id === chat.owner._id) {
            const isUserInChat = chat.members.reduce(
                (prev, member) => member._id === user._id ? true : prev
                , false
            )
            if (isUserInChat) {
                return (
                    <button
                        onClick={deleteMember}
                        aria-label={"remove from the chat"}
                        type="button"
                        className={"custom-button round-button blue-button"}>
                        <Icon
                            icon="minus"
                            size={"0.8em"}
                        />
                    </button>
                )
            } else {
                return (
                    <button
                        onClick={addToThisChat}
                        aria-label={"add to this chat"}
                        type="button"
                        className={"custom-button round-button"}>
                        <Icon
                            icon="plus"
                            size={"0.8em"}
                        />
                    </button>
                )
            }
        }
    }
    else {
        if (currentUserChats.length)
            return (<AddButton changeOpen={changeOpen}/>)
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    currentUserChats: state.chats.currentUserChats,
});

export default connect(mapStateToProps)(UserButton);