/* eslint-disable import/no-anonymous-default-export */
/**
 * The application loading component
 * @author gaurav sharma
 * @since 9th january 2018
 */
import "./index.scss";

export default () => {
  return (
    <section
      style={{ display: true ? "block" : "none" }}
      className="loader-container"
    >
      <div className="blocks">
        <div className="block orange"></div>
        <div className="block blue"></div>
      </div>
    </section>
  );
};
