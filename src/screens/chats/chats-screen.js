import React from "react";
import Spinner from "../../shared/components/Spinner";
import NavBar from "../../shared/components/navigation/NavBar";
import AddChatForm from "./components/AddChatForm";
import List from "../../shared/components/List";
import {connect} from "react-redux";
import {loadChats} from "../../services/ownersChats";

const Chats = ({currentUser, statusUser, statusChats, dispatch, currentUserChats}) => {
    const[needLoad, setNeedLoad] = React.useState(false);
    React.useEffect(() => {
            if (needLoad) {
                dispatch(loadChats(currentUser._id));
                setNeedLoad(false)
            }
        },
        [currentUser._id, dispatch, needLoad])

    const onAddChat = () => {
        setNeedLoad (true)
    }
    return (
        <>
            <NavBar text = {"Chats"}/>
            {/*<main>*/}
                <div className={"container-small"}>
                    <AddChatForm
                        onAdd = {onAddChat}
                    />
                </div>
                {(statusUser === "pending" || statusChats === "pending") ? <Spinner /> : null}
                {(statusUser === "resolved" || statusChats === "resolved") ?
                    <div className={"black-shadow"}>
                        <div className={"container"}>
                            {Array.isArray(currentUser.chats) ?
                                (statusUser === "resolved" && currentUser.chats.length !== 0) ?
                                    (
                                        <>
                                            <h5 className={"subheader mb-4"}>Member of chats:</h5>
                                            <List items={currentUser.chats} />
                                        </>
                                    )
                                    : null
                                : null
                            }
                            {(statusChats === "resolved" && currentUserChats.length !== 0) ?
                                (
                                    <>
                                        <h5 className={"subheader mt-5 mb-4"}>Owner of chats:</h5>
                                        <List items={currentUserChats} />
                                    </>
                                )
                                : null
                            }
                        </div>
                    </div>
                : null}
            {/*</main>*/}
        </>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    statusUser: state.currentUser.status,
    currentUserChats: state.chats.currentUserChats,
    statusChats: state.chats.status,

});

export default connect(mapStateToProps)(Chats);