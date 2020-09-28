import React from "react";

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
                +
            </button>
        </>
    )
}

export default AddButton