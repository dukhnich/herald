import React from "react";

const ReplyMsg = ({msg}) => {
    return (
        <div className={"small p-2 light-blue-bg mb-3"}>
            <p className={"blue-text text-break font-weight-bold m-0"}>{msg.owner.nick}</p>
            <pre className={"black-text text-truncate m-0 d-block mw-100"}>
                {msg.media && msg.media.length ? (
                    <span className={"brown-text font-weight-bold mr-1"}>Media</span>
                ) : null}
                {msg.text ? msg.text : null}
            </pre>
        </div>
    )
}

export default ReplyMsg