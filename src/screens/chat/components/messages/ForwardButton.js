import React from "react";
import Icon from "../../../../shared/icon";
import {connect} from "react-redux";
import Modal from "../../../../shared/components/Modal/Modal";
import SelectChatToForward from "./SelectChatToForward";

const ForwardButton = ({msg}) => {
    const [openMenu,setOpen] = React.useState(false);

    const changeOpen = () => {
        setOpen((prev) => !prev)
    }

    return (
        <div className={"mr-3"}>
            <button
                className={"custom-button mr-1 p-1"}
                type={"button"}
                onClick={changeOpen}
            >
                <Icon
                    icon="forward"
                    color={"#00a0ff"}
                    size={"1.5em"}
                />
            </button>
            Forward
            {openMenu ?
                <Modal open={openMenu}>
                    <div className={"container-small pt-5"}>
                        <SelectChatToForward
                            onClose={changeOpen}
                            message = {msg}
                        />
                    </div>
                </Modal> : null
            }
        </div>
    )
}

export default ForwardButton