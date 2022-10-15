
import "./index.scss";


interface PaginationProps {
  heading: string;
  text: string;
  firstButtonText: string;
  secondButtonText: string;
  firstButtonAction: Function;
  secondButtonAction: Function;
}


const Popup = ({
  heading,
  text,
  firstButtonText,
  secondButtonText,
  firstButtonAction,
  secondButtonAction,
}: PaginationProps
) => {

  return (
    <div className="popup">
      <div className="popup-container">
        <div className="popup-heading">{heading}</div>
        <div className="popup-text">{text}</div>
        <div className="popup-button">
        <button
          className=" btn view-button"
          onClick={() => {
            firstButtonAction()
          }}
        >
          {firstButtonText}
        </button>
        <button
          className=" btn view-button"
          onClick={() => {
            secondButtonAction()
          }}
        >
          {secondButtonText}
        </button>
        </div>
      </div>
    </div>
  )

  }

export default Popup;
