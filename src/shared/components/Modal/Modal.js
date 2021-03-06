import React from "react";
import "./modal.css";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

const Modal = ({ children, open, container, className }) => {
    if (open) {
        return ReactDOM.createPortal(
            <div className={className}>
                {children}
            </div>,
            container
        );
    }
    return null;
};

Modal.defaultProps = {
    container: document.body,
    className: "my-modal",
    open: false
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    // container: PropTypes.node,
    className: PropTypes.string,
    open: PropTypes.bool
}

export default Modal