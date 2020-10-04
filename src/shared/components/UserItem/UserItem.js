import React from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import {connect} from "react-redux";
import UserButton from "./UserButton";
import Modal from "../Modal/Modal";
import SelectChatForm from "./SelectChatForm";


const UserItem = ({user, isActive}) => {
    const { nick, chats } = user;
    const [openMenu,setOpen] = React.useState(false)

    const changeOpen = () => {
        setOpen((prev) => !prev)
    }

    return (
        <>
            <Avatar data={user} isBig={false} isUser={true}/>
            <div className={"flex-grow-1 ml-3 text-break"}>
                {nick}
            </div>
            {isActive ?
                <UserButton user = {user} changeOpen = {changeOpen}/>
                : null
            }

            {!isActive && chats && chats.length ? (
                <div className={"brown-text small ml-2 text-right"}>
                    Chats: {chats.length}
                </div>
                ) : null
            }
            {openMenu ?
            <Modal open={openMenu}>
                <div className={"container-small pt-5"}>
                    <SelectChatForm onClose={changeOpen} user = {user}/>
                </div>
            </Modal> : null
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
    currentUserChats: state.chats.currentUserChats,
});

export default connect(mapStateToProps)(UserItem);