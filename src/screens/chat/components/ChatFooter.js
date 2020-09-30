import React from "react";
import Icon from "../../../shared/icon";
import SendBtn from "./SendBtn";

const ChatFooter = ({chatID}) => {
    const [msg, setMsg] = React.useState("");
    const [attach, setAttach] = React.useState([]);

    const addAttach = (event) => {
        const files = event.target.files;
        // console.log(files)
        setAttach (files)
    }

    const removeAttach = () => {
        setAttach ([])
    }

    const onChange = (e) => {
        setMsg(e.target.value)
    };

    const clearData = () => {
        setMsg("")
        removeAttach()
    }

    return (
        <div className={"black-footer p-3 d-flex align-items-start justify-content-between"}>
            <SendBtn
                chatID={chatID}
                attach={attach}
                message={msg}
                onSend={clearData}
            />
            <label className={"pt-2"}>
                <Icon
                    color={attach.length ? "#ffbdb8" : "#ffffff"}
                    icon="camera"
                    size={"1.3rem"}
                />
                <input
                    onInput={addAttach}
                    className={"custom-file-input"}
                    type={"file"}
                    multiple={true}
                    name={"media"}
                />
            </label>
            {attach.length ?
                <button
                    onClick={removeAttach}
                    type={"button"}
                    className={"custom-button pt-2 ml-3"}
                >
                    <Icon
                        color={"#ffbdb8"}
                        icon="cross"
                        size={"1rem"}
                    />
                </button>
                : null}
                    <textarea
                        className={"black-input p-2 ml-3 flex-grow-1"}
                        placeholder={"Type message"}
                        name={"msg"}
                        value={msg}
                        onChange={onChange}
                    />
        </div>
    )
}

export default ChatFooter