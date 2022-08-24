import styles from "./index.module.scss";
import { TbFaceIdError } from "react-icons/tb"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ToastContainer } from "react-toastify";


const ErrorPage = () => {
  const show = useAppSelector((state) => state.toastError.value);

  console.log("SHow value oin error page------->", show)
  return (
    <>
      {
        show ?
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          /> 
          : 
          <div className={styles["error-page"]}>
            <div className={styles["error-background"]}>
              <div><TbFaceIdError /></div>
              <div> Not Found!</div>
            </div>
          </div>
      }

    </>
  );
};

export default ErrorPage;
