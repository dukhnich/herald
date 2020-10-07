import React from "react";
import Icon from "../../../../shared/icon";
import Modal from "../../../../shared/components/Modal/Modal";
import SelectEmojiModal from "./SelectEmojiModal";

const EmojiButton = () => {
    const [openMenu,setOpen] = React.useState(false);

    const changeOpen = () => {
        setOpen((prev) => !prev)
    }
    return (
        <div className={"mr-3"}>
            <button
                className={"custom-button  pt-2"}
                type={"button"}
                onClick={changeOpen}
            >
                <Icon
                    icon="smile"
                    color={"#ffffff"}
                    size={"1.2rem"}
                />
            </button>
            {openMenu ?
                <Modal open={openMenu}>
                    <div className={"container-small pt-5"}>
                        <SelectEmojiModal
                            onClose={changeOpen}
                        />
                    </div>
                </Modal> : null
            }
        </div>
    )
}

export default EmojiButton