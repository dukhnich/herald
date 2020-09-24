import React from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import {connect} from "react-redux";
import Modal from "../Modal/Modal";
import SelectChatForm from "./SelectChatForm";


const UserItem = ({user, isActive, currentUser}) => {
    const { nick, chats } = user;
    const [openMenu,setOpen] = React.useState(false)

    const changeOpen = () => {
        setOpen((prev) => !prev)
    }

    const addToChat = (e) => {
        e.preventDefault();
        changeOpen();
    }

    return (
        <>
            <Avatar data={user} isBig={false} isUser={true}/>
            <div className={"flex-grow-1 ml-3"}>
                {nick}
            </div>
            {isActive ?
                <button
                    onClick={addToChat}
                    aria-label={"add to a chat"}
                    type ="button"
                    className={"custom-button round-button ml-3"}>
                    +
                </button>
                : <div className={"brown-text small"}>Chats: {chats ? chats.length : 0}</div>
            }
            {openMenu ?
                (
                    <Modal open={openMenu}>
                        <div className={"container-small"}>
                            <SelectChatForm onClose={changeOpen} user = {user}/>
                        </div>
                    </Modal>
                )
                :null
            }
        </>
    );
};

UserItem.propTypes = {
    user: PropTypes.shape({
        nick: PropTypes.string,
        avatar: PropTypes.object,
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    isActive: PropTypes.bool
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(UserItem);