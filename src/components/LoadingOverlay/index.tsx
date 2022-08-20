/* eslint-disable import/no-anonymous-default-export */
/**
 * The application loading component
 * @author gaurav sharma
 * @since 9th january 2018
 */
import "./index.css";

export default () => {
  return (
    <section
      style={{ display: true ? "block" : "none" }}
      className="loader-container"
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        
      </div>
    </section>
  );
};
