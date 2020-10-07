import React from "react";
import {connect} from "react-redux";
import Icon from "../../../../shared/icon";
import Modal from "../../../../shared/components/Modal/Modal";
import ChatModal from "./ChatModal";

const ChatSettingsButton = ({currentUser, currentChat}) => {
    const [openMenu,setOpen] = React.useState(false)
    const alert = React.useRef();
    const isOwner = currentUser._id === currentChat.owner._id;

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
                            onClose = {changeOpen}
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
    currentChat: state.currentChat.currentChat,
});

export default connect(mapStateToProps)(ChatSettingsButton);