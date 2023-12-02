import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function ({ buttonText, children}, ref) {
    const dialogRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            open: () => dialogRef.current.showModal(),
            close
        }
    },[children])

    function close() {
        dialogRef.current.close()
    }

    return createPortal((
        <dialog ref={dialogRef} >
                {children}
            <form className="modal-btn-div" method="dialog">
                <button className="modal-btn" onClick={close}>{buttonText}</button>
            </form>
        </dialog>
    ), document.getElementById('modal'));
})

export default Modal;