import React from "react";
import {connect} from "react-redux";
import Icon from "../../../shared/icon";
import Modal from "../../../shared/components/Modal/Modal";
import ChatModal from "./ChatModal";

const ChatSettingsButton = ({chat, currentUser, currentUserChats, onChangeData}) => {
    const [openMenu,setOpen] = React.useState(false)
    const alert = React.useRef();
    const isOwner = currentUser._id === chat.owner._id;

    const changeOpen = () => {
        setOpen((prev) => !prev)
    }

    return (
        <div ref={alert} className={"ml-3 d-inline-block"}>
            <button
                onClick={changeOpen}
                type={"button"}
                className={"custom-button position-relative"}
            >
                <Icon icon={isOwner ? "settings" : "more"}
                      size={"1rem"}
                      color={"#ffffff"}
                />
            </button>
            {openMenu ?
                (
                    <Modal
                        open={openMenu}
                    >
                        <ChatModal
                            chat = {chat}
                            onClose = {changeOpen}
                            onChangeData = {onChangeData}
                        />
                    </Modal>
                )
                :null
                    }
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    currentUserChats: state.chats.currentUserChats,
});

export default connect(mapStateToProps)(ChatSettingsButton);