import React from "react";
import InputGroup from "../../../shared/components/form/InputGroup";
import FormFooter from "../../../shared/components/form/FormFooter";
import Icon from "../../../shared/icon";


const SearchForm = ({onSearch, onCheck, isSearchChat}) => {
    const [values, setValues] = React.useState({search:""});
    const onSubmit = (e) => {
        e.preventDefault();
        onSearch(values.search)
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

    const onCheckBox = (e)=>{
        e.preventDefault();
        onCheck()
    }

    return <form onSubmit={onSubmit} className={"shadow mt-5"}>
        <div className={"form-body position-relative"}>
            <InputGroup
                label={isSearchChat ? "Chat title" : "User nick"}
            >
                <input
                    type="search"
                    name={"search"}
                    onChange={onChange}
                />

            </InputGroup>
            <button
                aria-label={"search"}
                type ="submit"
                className={"custom-button round-button ml-3"}>
                <Icon icon="search" />
            </button>
        </div>
        <FormFooter>
            <h6 className={"flex-grow-1"}>
                {isSearchChat ? "Search chats" : "Search users"}
            </h6>

            <label className={"toggler" + (isSearchChat ? " toggler-checked" : "")}>
                <input
                    id = {"isSearchChat"}
                    className={"custom-checkbox"}
                    type="checkbox"
                    name={"isSearchChat"}
                    checked = {isSearchChat}
                    onChange={onCheckBox}
                />

            </label>

        </FormFooter>
    </form>
}

export default SearchForm;
