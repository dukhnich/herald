import React from "react";
import client from "../../API";
import Spinner from "../../shared/components/Spinner";
import { gql } from "graphql-request";
import NavBar from "../../shared/components/navigation/NavBar";
import SearchForm from "./components/SearchForm";
import List from "../../shared/components/List";

const chatsFind = gql`
  query chatFind ($query: String){
    ChatFind(query: $query) {
        _id
        title
        avatar {url}
        owner {_id nick}
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

const Search = () => {
    const [result, setResult] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [isSearchChat, setIsSearchChat] = React.useState(true);

    const changeChatOrUser = () => {
        setIsSearchChat(prev => !prev)
    }


    const searchResult =  (text) => {
        if (!text) {
            setResult(null);
            return
        }
        setStatus("pending");
        const key = isSearchChat ? "title" : "nick";
        const request = JSON.stringify([
            {
                [key]: new RegExp(text).toString()
            },
            {
                sort:[{[key]: 1}]
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
            <main>
                <div className={"container-small"}>
                    <SearchForm
                        onSearch={searchResult}
                        isSearchChat = {isSearchChat}
                        onCheck = {changeChatOrUser}
                    />
                </div>
                {status === "pending" ? <Spinner /> : null}
                    {Array.isArray(result) ?
                        <div className={"black-footer pt-2"}>
                            <div className={"container-small mt-4"}>
                                {result.length === 0 ? (
                                    <h5 className={"subheader"}>No Data</h5>
                                ) : (
                                    <List items={result}/>
                                )}
                            </div>
                        </div>
                    : null}
            </main>
        </>
    );
};

export default Search;