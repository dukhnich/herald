import React from "react";
import Spinner from "./../../shared/components/Spinner";
import NavBar from "../../shared/components/navigation/NavBar";
import {connect} from "react-redux";
import ProfileForm from "./components/ProfileForm";
import {loadUser} from "../../services/userData";

const HomeScreen = ({currentUser, dispatch, status}) => {
    const[needLoad, setNeedLoad] = React.useState(true)
    React.useEffect( ()=>{
            if (needLoad) {
                dispatch(loadUser(currentUser._id));
                setNeedLoad(false)
            }
        },
        [currentUser._id, dispatch, needLoad])

    const onChangeData = () => {
        setNeedLoad (true)
    }

    return (
        <>
            <NavBar text={"Profile"}/>
            <main className={"black-shadow low-shadow"}>
                <div className={"container-small"}>
                    {status === "pending" ? <Spinner /> : null}
                    {status === "resolved" ?
                        <>
                            <ProfileForm onChangeData={onChangeData}/>
                        </>
                        : null
                    }
                </div>
            </main>
        </>
    );
};


const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    status: state.currentUser.status,
});

export default connect(mapStateToProps)(HomeScreen);
