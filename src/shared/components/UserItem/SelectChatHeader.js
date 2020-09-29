import React from "react";
import Avatar from "../../../shared/components/Avatar/Avatar";

const SelectChatHeader = ({user}) => {
    const {nick} = user;
    return (
        <div className={"d-flex justify-content-between"}>
            <Avatar data={user} />
            <div className={"mx-4 d-flex flex-column align-items-end justify-content-end"}>
                <h1 className={"subheader text-break text-right"}>{nick}</h1>
            </div>
        </div>
    )
}

export default SelectChatHeader