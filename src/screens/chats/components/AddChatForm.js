import React from "react";
import InputGroup from "../../../shared/components/form/InputGroup";
import FormFooter from "../../../shared/components/form/FormFooter";
import ChatFormHeader from "./ChatFormHeader";
import {gql} from "graphql-request";
import API from "../../../API";
import {connect} from "react-redux";


const mutationCreateChat = gql`
  mutation addChat($title: String, $members:[UserInput]) {
    ChatUpsert(chat: {title: $title, members: $members}) {
      _id
      owner {_id nick}
      members {_id nick}
    }
  }
`;

const addChatAvatar = gql`
  mutation addChatAvatar($_id: ID!, $chatAvatar: [ChatInput]) {
    MediaUpsert(media: {_id: $_id, chatAvatar: $chatAvatar}) {
      _id
      url
      chatAvatar {_id title}
    }
  }
`;

const AddChatForm = ({currentUser, onAdd}) => {
    const [avatarID, setAvatarID] = React.useState(null)

    const [values, setValues] = React.useState({search:""});

    const addAvatar = (chatID) => {
        API.request(addChatAvatar
            , {
                _id: avatarID,
                chatAvatar: [{_id: chatID}]
            }
        )
            .catch(e => {
                console.log(e);
            });
    }

    const createChat = (name) => {
        API.request(mutationCreateChat
            , {
            title: name,
            // members: [{_id: currentUser._id}]
            }
        )
            .then((r) => {
                if (avatarID) {
                    addAvatar(r.ChatUpsert._id)
                }

            })
            .then(() => onAdd())
            .catch(e => {
                console.log(e);
            });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        createChat(values.title)
    }
    const onChange = async (e) => {
        const target = e.target;
        await setValues((prev) => ({
            ...prev,
            [target.name]: ("boolean" === typeof prev[target.name]) ?
                !prev[target.name] :
                target.value
        }));
    };

    const createAvatar = (id) => {
        console.log(id)
        setAvatarID(id)
    }

    return <form onSubmit={onSubmit} className={"shadow mt-5"}>
        <ChatFormHeader addAvatar={createAvatar}/>
        <div className={"form-body"}>
            <InputGroup
                label={"Chat title"}
            >
                <input
                    type="text"
                    name={"title"}
                    onChange={onChange}
                />

            </InputGroup>
        </div>
        <FormFooter>
            <button type={"submit"} className={"custom-button"}>
                <div className={"triangle triangle-right"}/>
            </button>
            <h5 className={"subheader"}>
                Create chat
            </h5>
        </FormFooter>
    </form>
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(AddChatForm);