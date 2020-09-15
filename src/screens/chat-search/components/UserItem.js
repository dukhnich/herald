import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "../../../shared/components/Avatar/Avatar";
import {gql} from "graphql-request";
import API from "../../../API";
import {connect} from "react-redux";


const UserItem = ({user, isActive, currentUser}) => {
    const { nick, _id, chats } = user;

    return (
        <>
            <Avatar data={user} isBig={false} isUser={true}/>
            <Link
                to={`/users/${_id}`}
                className={"flex-grow-1 ml-3"}
            >
                {nick}
            </Link>
            <div className={"brown-text small"}>Chats: {chats ? chats.length : 0}</div>
        </>
    );
};

UserItem.propTypes = {
    user: PropTypes.shape({
        nick: PropTypes.string,
        avatar: PropTypes.object,
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    isActive: PropTypes.bool
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(UserItem);