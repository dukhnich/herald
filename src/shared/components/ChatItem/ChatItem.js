import React from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import {gql} from "graphql-request";
import {connect} from "react-redux";
import RoundButton from "./RoundButton";

const deleteChat = gql`
  mutation chatDelete ($_id: ID!) {
    ChatDelete(chat: {_id: $_id}) {
      _id
      title
    }
  }
`;

const ChatItem = ({chat, isActive, currentUser}) => {
    const { title, members } = chat;

    return (
        <>
            <Avatar data={chat} isBig={false} isUser={false}/>
            <div className={"flex-grow-1 ml-3"}>
                        {title}
                    </div>

            {isActive ?
                <RoundButton chat ={chat} user = {currentUser}/>
            : <div className={"brown-text small"}>Members: {members ? members.length : 0}</div>
            }
        </>
    );
};

ChatItem.propTypes = {
    chat: PropTypes.shape({
        title: PropTypes.string,
        avatar: PropTypes.object,
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    isActive: PropTypes.bool
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(ChatItem);