import React from "react";
import client from "../../API";
import Spinner from "../../shared/components/Spinner";
import { gql } from "graphql-request";
import NavBar from "../../shared/components/navigation/NavBar";
import SearchForm from "./components/SearchForm";
import List from "./components/List";

const chatsFind = gql`
  query chatFind ($query: String){
    ChatFind(query: $query) {
        _id
        title
        avatar {url}
        owner {nick}
        members {_id}
    }    
  }
`;

const usersFind = gql`
  query userFind ($query: String){
    UserFind(query: $query) {
        _id
        nick
        avatar {url}
        chats {_id}
    }    
  }
`;

const ChatSearch = () => {
    const [result, setResult] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [isSearchChat, setIsSearchChat] = React.useState(true);

    const changeChatOrUser = () => {
        setIsSearchChat(prev => !prev)
    }


    const searchResult =  (text) => {
        console.log(text)
        if (!text) {
            setResult(null);
            return
        }
        setStatus("pending");
        const request = JSON.stringify([
            {
                [isSearchChat ? "title" : "nick"]:
                    new RegExp(text).toString()
            }
        ])
        client
            .request((isSearchChat ? chatsFind : usersFind), {
                query: request
            })
            .then((d) => {
                setResult((isSearchChat ? d.ChatFind : d.UserFind));
                setStatus(null)
            });
    };
    return (
        <>
            <NavBar text = {"Search Chat"}/>

            <div className={"container-small"}>
                <SearchForm
                    onSearch={searchResult}
                    isSearchChat = {isSearchChat}
                    onCheck = {changeChatOrUser}
                />
            </div>

            <div className={"black-footer"}>
                <div className={"container-small"}>

                {status === null ? null : <Spinner /> }
                {Array.isArray(result) ?
                    result.length === 0 ? (
                        <span>No Data</span>
                    ) : (
                        // JSON.stringify(result)
                        <List items={result} />
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default ChatSearch;