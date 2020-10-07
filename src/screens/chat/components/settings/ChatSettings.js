import React from "react";
import API from "../../../../API";
import InputGroup from "../../../../shared/components/form/InputGroup";
import FormFooter from "../../../../shared/components/form/FormFooter";
import {gql} from "graphql-request";
import Icon from "../../../../shared/icon";
import {search} from "../../../../shared/helpers/search";
import Spinner from "../../../../shared/components/Spinner";
import List from "../../../../shared/components/List";
import {connect} from "react-redux";
import {loadChat} from "../../../../services/currentChat";

const changeChatTitle = gql`
  mutation changeChat($_id: ID!, $title: String) {
    ChatUpsert(chat: {_id: $_id, title: $title}) {
      _id
    }
  }
`;

const ChatSettings = ({currentChat, onClose, dispatch}) => {
    const [values, setValues] = React.useState(currentChat);
    const [result, setResult] = React.useState(null);
    const [status, setStatus] = React.useState(null);

    const mutateChat = (data) => {
        API.request(changeChatTitle
            , data
        )
            .then(() => {
                dispatch(loadChat(currentChat._id));
            })
            .catch(e => {
                console.log(e);
            });
    }

    const changeTitle = (e) => {
        e.preventDefault();
        mutateChat({"_id": values._id, "title": values.title})
    }

    const onChange = (e) => {
        const target = e.target;
        setValues((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const searchResult = async (text) => {
        if (!text) {
            setResult(null);
            return
        }
        setStatus("pending");
        const result = await search(text, false);
        setResult(result);
        setStatus(null)
    };

    const onSearch = (e) => {
        e.preventDefault();
        searchResult(values.nick)
    }

    return (
        <div className={"container-small my-5"}>
            <form>
                <button
                    onClick={onClose}
                    aria-label={"close"}
                    type ="button"
                    className={"custom-button round-button"}>
                    <Icon
                        icon="cross"
                        size={"0.8em"}
                    />
                </button>

                <div className={"form-body"}>
                    <h1 className={"medium-header mb-3"}>{currentChat.title}</h1>
                    <InputGroup label={"Title"}>
                        <input
                            type="text"
                            placeholder={"New title"}
                            name="title"
                            defaultValue={currentChat.title}
                            onChange={onChange}
                        />
                    </InputGroup>
                    <button
                        onClick={changeTitle}
                        type ="button"
                        className={"btn btn-sm btn-outline-primary mb-2"}>
                        Change title
                    </button>
                </div>
                <FormFooter>
                    <button
                        onClick={onSearch}
                        aria-label={"search"}
                        type ="submit"
                        className={"custom-button round-button ml-3"}>
                        <Icon icon="search" />
                    </button>
                        <label className={"w-100 flex-shrink-0"}>
                            Add members
                            <input
                                className={"blue-input"}
                                type="text"
                                placeholder="Nick"
                                name="nick"
                                onChange={onChange}
                            />
                        </label>
                        {status === "pending" ? <Spinner /> : null}
                        {Array.isArray(result) ?
                                result.length === 0 ? (
                                    <h5 className={"subheader"}>No Data</h5>
                                ) : (
                                    <List items={result}/>
                                )
                            : null}
                </FormFooter>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentChat: state.currentChat.currentChat,

});

export default connect(mapStateToProps)(ChatSettings);