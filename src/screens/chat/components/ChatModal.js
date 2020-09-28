import React from "react";
import {connect} from "react-redux";
import List from "../../../shared/components/List";
import ChatSettings from "./ChatSettings";
import Spinner from "../../../shared/components/Spinner";

const ChatModal = ({chat, currentUser, status, currentUserChats, onClose, onChangeData}) => {
    const isOwner = currentUser._id === chat.owner._id;

    const onClick =  (e) => {
        e.preventDefault();
        onClose()
    }

    React.useEffect(() => {
        const currentChat = currentUserChats.reduce(
            (prev, current) => current._id === chat._id ? current : prev
            ,null)
            if (currentChat && currentChat.members.length !== chat.members.length) {
                onChangeData()
            }
        }
        ,[currentUserChats])

    if (status === "resolved") {

        return (
            <>
                {isOwner ?
                    <ChatSettings
                        chat={chat}
                        onClose={onClick}
                        onChangeData={onChangeData}
                    />
                    :
                    <button
                        onClick={onClick}
                        aria-label={"close"}
                        type="button"
                        className={"custom-button round-button mt-5"}>
                        &#215;
                    </button>
                }
                <div className={"container"}>

                    <h2 className={"subheader text-white mt-5 mb-3"}>Members of the chat</h2>
                    <List
                        items={chat.members}
                        isRemoveButton={true}
                        currentChat={chat}
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
    status : state.chats.status,

});

export default connect(mapStateToProps)(ChatModal);