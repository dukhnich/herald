import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import Icon from "../../../../shared/icon";
import {connect} from "react-redux";
import FormFooter from "../../../../shared/components/form/FormFooter";
import {findThisMessage} from "../../FindThisMessage";

const SelectEmojiModal = ({onClose, currentMessages, currentChat, currentUser, dispatch}) => {
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const thisMsg = findThisMessage(currentMessages, currentChat._id)

    const onClick = (e) => {
        e.preventDefault();
        onClose()
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: "newMessage/changeInfo",
            payload:{text: thisMsg.text + chosenEmoji.emoji, chat: {_id: currentChat._id}}
        })
        onClose()
    }

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    return (
        <form onSubmit={onSubmit}>
            <button
                onClick={onClick}
                aria-label={"close"}
                type ="button"
                className={"custom-button round-button ml-3"}>
                <Icon
                    icon="cross"
                    size={"0.8em"}
                />
            </button>
            <div className={"form-body px-0 d-flex justify-content-center"}>
                <Picker onEmojiClick={onEmojiClick} />
            </div>
            <FormFooter>
                {chosenEmoji ? (<>
                    <button type={"submit"} className={"custom-button"}>
                        <div className={"triangle triangle-right"}/>
                    </button>
                    <h5 className={"subheader"}>
                        Select {chosenEmoji.emoji}
                    </h5>
                </>) : (
                    <h5 className={"subheader"}>
                        No emoji Chosen
                    </h5>
                )}
            </FormFooter>


        </form>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    currentChat: state.currentChat.currentChat,
    currentMessages: state.currentMessages.currentMessages,

});

export default connect(mapStateToProps)(SelectEmojiModal);