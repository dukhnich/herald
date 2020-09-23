import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import addOrDeleteMember from "../../helpers/addOrDeleteMembers";
import Icon from "../../icon";


const RoundButton = ({user, chat, dispatch}) => {
    const { _id, members, owner } = chat;
    const isChatOfCurrentUser = !!(user.chats.filter(chat => chat._id === _id).length)



    const addMember = (e) => {
        e.preventDefault();
        addOrDeleteMember(dispatch, user._id, chat, true)
    }

    const deleteMember = (e) => {
        e.preventDefault();
        addOrDeleteMember(dispatch, user._id, chat, false)
    }

    if (isChatOfCurrentUser)
        return (<>
            <button
                onClick={deleteMember}
                aria-label={"remove from the chat"}
                type ="button"
                className={"custom-button round-button additional-button"}>
                —
            </button>
            <Link
                to={`/chats/${_id}`}
                aria-label={"go to the chat"}
                className={"custom-button round-button text-center"}
            >
                <Icon icon="arrow" />
            </Link>
        </>)
    if (owner._id === user._id)
        return (
            <button
                onClick={addMember}
                aria-label={"add to the chat"}
                type ="button"
                className={"custom-button round-button"}>
                +
            </button>
        )

    return null
}


const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(RoundButton);