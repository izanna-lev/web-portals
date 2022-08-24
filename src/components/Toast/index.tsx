import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { MdDone } from "react-icons/md"
import { IoMdClose } from "react-icons/io"
import "./index.scss"
import { useEffect } from "react";

const Toast = () => {
    const show = useAppSelector((state: {
        toastError: {
            data: {
                message: string, type: string
            };
        };
    }) => state.toastError.data);

    console.log("SHOW TOAST", show);

    useEffect(() => {
        let shand = document.getElementsByClassName('wrapper') as HTMLCollectionOf<HTMLElement>;

        if (show.type && shand.length != 0) {
            shand[0].style.display = "";

            setTimeout(function () {
                shand[0].style.display = "none";
            }, 2000);
        }

    }, [new Date().getTime()]);


    return (
        show.type ?
            <div className="wrapper" id="wrapper">
                <div className={`toast ${show.type}`}>
                    <div className={`outer-container ${show.type}icon`}>
                        {show.type === 'success' ? <MdDone className="fas done" /> : <IoMdClose className="fas" />}
                    </div>
                    <div className="inner-container">
                        <p>{show.type.charAt(0).toUpperCase() + show.type.slice(1)}</p>
                        <p>{show.message}</p>
                    </div>
                </div>
            </div> : <></>
    )
        ;
};

export default Toast;
