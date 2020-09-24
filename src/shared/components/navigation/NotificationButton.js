import React from "react";
import {connect} from "react-redux";
import Icon from "../../icon";
import {array} from "prop-types";
import Modal from "../Modal/Modal";
import List from "../List";

const NotificationButton = ({notifications}) => {
    const [openMenu,setOpen] = React.useState(false)
    const alert = React.useRef();
    const count = notifications.reduce((prev, current) =>
        prev + (current.notifications.length || 0)
        , 0)


    const changeOpen = () => {
        setOpen((prev) => !prev)
    }
    // console.log(notifications)
    return  (
        <div ref={alert}>
            {count ? (
            <>
                <button
                    onClick={changeOpen}
                    type={"button"}
                    className={"custom-button position-relative"}
                >
                    <Icon color={"#ffbdb8"} icon="alert" />
                    <span className={"ml-1 rose-text"}>{count}</span>
                </button>
                {openMenu ?
                    (
                        <Modal
                            open={openMenu}
                            container = {alert.current}
                            className = {"notification-modal"}
                        >
                            <List items={notifications}/>
                        </Modal>
                    )
                    :null
                }
            </>

            ) : (
                <Icon color={"#444"} icon="alert" />
            )}
        </div>
    )

}

NotificationButton.propTypes = {
    notifications: array
}

const mapStateToProps = (state) => ({
    notifications: state.notifications.chats,
});
export default connect(mapStateToProps)(NotificationButton);