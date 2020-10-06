import React from "react";
import MediaList from "./messages/MediaList";

const LinkedMsg = ({msg, isFull, isForward}) => {
    return (
        <div className={"small p-2 mb-3 " + (isForward ? "rose-bg" : "light-blue-bg")}>
            <p
                className={"text-truncate font-weight-bold mw-100 m-0 " + (isForward ? "brown-text" : "light-blue-bg blue-text")}>
                {msg.owner.nick}
            </p>
            {msg.media && msg.media.length ? (
                isFull && (<MediaList media={msg.media}/>)
            ) : null}
            <pre className={"black-text m-0 d-block mw-100 " + (isFull ? "text-wrap" : "text-truncate")}>
                {!isFull && (
                    <span className={"brown-text font-weight-bold mr-1"}>
                        Media
                    </span>
                )}
                {msg.text ? msg.text : null}
            </pre>
        </div>
    )
}

LinkedMsg.defaultProps = {
    isForward : false,
    isFull: false
}

export default LinkedMsg