import React from "react";
import {connect} from "react-redux";
import List from "../../../../shared/components/List";
import ChatSettings from "./ChatSettings";
import Spinner from "../../../../shared/components/Spinner";
import Icon from "../../../../shared/icon";
import {loadChat} from "../../../../services/currentChat";

const ChatModal = ({currentChat, currentUser, status, currentUserChats, dispatch, onClose}) => {
    const isOwner = currentUser._id === currentChat.owner._id;

    const onClick =  (e) => {
        e.preventDefault();
        onClose()
    }

    React.useEffect(() => {
        const oldData = currentUserChats.reduce(
            (prev, current) => current._id === currentChat._id ? current : prev
            ,null)
            if (oldData && oldData.members.length !== currentChat.members.length) {
                dispatch(loadChat(currentChat._id));
            }
        }
        ,[currentChat._id, currentChat.members.length, currentUserChats, dispatch])

    if (status === "resolved") {

        return (
            <>
                {isOwner ?
                    <ChatSettings
                        onClose={onClick}
                    />
                    :
                    <button
                        onClick={onClick}
                        aria-label={"close"}
                        type="button"
                        className={"custom-button round-button mt-5"}>
                        <Icon
                            icon="cross"
                            size={"0.8em"}
                        />
                    </button>
                }
                <div className={"container"}>

                    <h2 className={"subheader text-white mt-5 mb-3"}>Members of the chat</h2>
                    <List
                        items={currentChat.members}
                        isRemoveButton={true}
                    />
                </div>
            </>
        )
    }
    else return <Spinner />
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    currentUserChats: state.chats.currentUserChats,
    currentChat: state.currentChat.currentChat,
    status : state.chats.status,

});

export default connect(mapStateToProps)(ChatModal);