import React from "react";
import {ENDPOINT} from "../../../API";
import Icon from "../../../shared/icon";

const MediaList = ({media}) => {
    if (!(media && media.length)) return null

    return (<>
        {
            media.map(issue => {
                if (issue.type && issue.type.includes("image")) {
                    return (<img
                        key={issue._id}
                        className={"mb-3"}
                        src={ENDPOINT + "/" + issue.url}
                        alt={issue.text || ""}
                    />)
                }
                return(
                    <p key={issue._id} className={"message-text mb-3"}>
                        <a
                            className={"mr-2"}
                            href={ENDPOINT + "/" + issue.url}
                            download
                        >
                            <Icon
                                color={"#00a0ff"}
                                icon="download"
                                size={"1.5em"}
                            />
                        </a>
                        {issue.originalFileName}
                    </p>
                )
            })
        }
    </>
    )
}

export default MediaList