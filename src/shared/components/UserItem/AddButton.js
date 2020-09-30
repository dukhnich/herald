import React from "react";
import Icon from "../../icon";

const AddButton = ({changeOpen}) => {

    const addToChat = (e) => {
        e.preventDefault();
        changeOpen();
    }

    return (<>
            <button
                onClick={addToChat}
                aria-label={"add to a chat"}
                type ="button"
                className={"custom-button round-button"}>
                <Icon
                    icon="plus"
                    size={"0.8em"}
                />
            </button>
        </>
    )
}

export default AddButton