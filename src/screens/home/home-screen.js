import React from "react";
import Spinner from "./../../shared/components/Spinner";
import useQuery from "./../../shared/hooks/use-query";
import { gql } from "graphql-request";
import NavBar from "../../shared/components/navigation/NavBar";
import {connect} from "react-redux";
import ProfileForm from "./components/ProfileForm";
import {loadUser} from "../../services/userData";
import ProfileHeader from "./components/ProfileHeader";


const HomeScreen = ({currentUser, dispatch, status}) => {
    const[needLoad, setNeedLoad] = React.useState(true)
    React.useEffect( ()=>{
            if (needLoad) {
                dispatch(loadUser(currentUser._id));
                setNeedLoad(false)
            }
        },
        [needLoad])

    const onChangeData = () => {
        setNeedLoad (true)
    }

    return (
        <>
        <NavBar text={"Profile"}/>
            <div className={"black-shadow"}>
                <div className={"container-small"}>
                    {status === "pending" ? <Spinner /> : null}
                    {status === "resolved" ?
                        <>
                            <ProfileForm onChangeData={onChangeData}/>
                        </>
                        : null
                    }
                </div>
            </div>
            </>
    );
};


const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    status: state.currentUser.status,
});

export default connect(mapStateToProps)(HomeScreen);