/* eslint-disable import/no-anonymous-default-export */
/**
 * The application loading component
 * @author Jagmohan Singh
 * @since 9th january 2018
 */
import "./index.css";

 type Props = {
    position?: string
}

export default ({position = ""}:Props) => {
  return (
    <div className={`spinner ${position}`}></div>
  );
};
