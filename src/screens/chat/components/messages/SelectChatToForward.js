import React from "react";
import {connect} from "react-redux";
import Icon from "../../../../shared/icon";
import InputGroup from "../../../../shared/components/form/InputGroup";
import FormFooter from "../../../../shared/components/form/FormFooter";

const SelectChatToForward = ({onClose, currentChat, currentUser, dispatch, message}) => {
    const [values, setValues] = React.useState({chat: currentUser.chats[0]._id});

    const onClick = (e) => {
        e.preventDefault();
        onClose()
    }

    const onChange = (e) => {
        const target = e.target;
        setValues((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: "newMessage/changeInfo",
            payload:{
                forwarded: message,
                chat: {_id: values.chat}
            }
        })
        if (currentChat._id !== values.chat) {
            dispatch({
                type: "loadChat/goTo",
                payload: values.chat
            })
        }
        else {onClose()}
    }

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
            <div className={"form-body"}>
                <InputGroup label={"Select chat"}>
                    <select
                        name="chat"
                        onChange={onChange}
                    >
                        {
                            currentUser.chats.map((chat)=>(
                                <option value={chat._id} key = {chat._id}>{chat.title}</option>
                            ))
                        }
                    </select>
                </InputGroup>
            </div>
            <FormFooter>
                <button type={"submit"} className={"custom-button"}>
                    <div className={"triangle triangle-right"}/>
                </button>
                <h5 className={"subheader"}>
                    Forward
                </h5>
            </FormFooter>
        </form>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    currentChat: state.currentChat.currentChat,

});

export default connect(mapStateToProps)(SelectChatToForward);