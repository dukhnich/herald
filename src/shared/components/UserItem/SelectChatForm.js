import React from "react";
import {connect} from "react-redux";
import InputGroup from "../form/InputGroup";
import FormFooter from "../form/FormFooter";
import SelectChatHeader from "./SelectChatHeader";
import addOrDeleteMember from "../../helpers/addOrDeleteMembers";


const SelectChatForm = ({onClose, currentUserChats, dispatch, user}) => {
    const [values, setValues] = React.useState({});

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
        const currentChat = currentUserChats.reduce((chat, current) =>
                current._id === values.chat ? current : chat
        ,{});
        addOrDeleteMember(dispatch, user._id, currentChat, true)
    }

    return (
        <form onSubmit={onSubmit}>
            <button
                onClick={onClick}
                aria-label={"close"}
                type ="button"
                className={"custom-button round-button ml-3"}>
                &#215;
            </button>
            <SelectChatHeader user = {user}/>
            <div className={"form-body"}>
                <InputGroup label={"Select chat"}>
                    <select
                        name="chat"
                        onChange={onChange}
                    >
                        {
                            currentUserChats.map((chat)=>(
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
                    Add to chat
                </h5>
            </FormFooter>
        </form>
    )
}

const mapStateToProps = (state) => ({
    currentUserChats: state.chats.currentUserChats,
});

export default connect(mapStateToProps)(SelectChatForm);