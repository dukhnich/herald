import React from "react";
import MediaList from "./messages/MediaList";

const Media = ({media, isFull}) => {
    return (
        isFull ? (
            <MediaList media={media}/>
        ) : (
            <span className={"brown-text font-weight-bold mr-1"}>
                Media
            </span>
        )
    )
}

const LinkedMsg = ({msg, isFull, isForward}) => {
    return (
        <div className={"small p-2 mb-3 " + (isForward ? "rose-bg" : "light-blue-bg")}>
            <p
                className={"text-truncate font-weight-bold mw-100 m-0 " + (isForward ? "brown-text" : "light-blue-bg blue-text")}>
                {msg.owner.nick}
            </p>
            <pre className={"black-text text-truncate m-0 d-block mw-100"}>
                {msg.media && msg.media.length ? (
                        <Media media={msg.media} isFull={isFull}/>
                    ) : null}
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