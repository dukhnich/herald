import React from "react";
import Spinner from "../../shared/components/Spinner";
import NavBar from "../../shared/components/navigation/NavBar";
import SearchForm from "./components/SearchForm";
import List from "../../shared/components/List";
import {search} from "../../shared/helpers/search";

const Search = () => {
    const [result, setResult] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [isSearchChat, setIsSearchChat] = React.useState(true);

    const changeChatOrUser = () => {
        setIsSearchChat(prev => !prev)
    }

    const searchResult = async (text) => {
        if (!text) {
            setResult(null);
            return
        }
        setStatus("pending");
        const result = await search(text, isSearchChat);
        setResult(result);
        setStatus(null)
    };

    return (
        <>
            <NavBar text = {"Search"}/>
            <main>
                <div className={"container-small"}>
                    <SearchForm
                        onSearch={searchResult}
                        isSearchChat = {isSearchChat}
                        onCheck = {changeChatOrUser}
                    />
                </div>
                {status === "pending" ? <Spinner /> : null}
            </main>
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
        </>
    );
};

export default Search;