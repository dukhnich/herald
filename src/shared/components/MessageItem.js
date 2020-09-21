import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "./Avatar/Avatar";
import {gql} from "graphql-request";
import API from "../../API";
import {connect} from "react-redux";


const MessageItem = ({message, isActive, currentUser}) => {
    const { text, _id, createdAt, owner, } = message;

    return (
        <>
            <Avatar data={owner} isBig={false} isUser={true}/>
            <div className={"flex-grow-1 ml-3"}>
                {text}
            </div>
        </>
    );
};


const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(MessageItem);