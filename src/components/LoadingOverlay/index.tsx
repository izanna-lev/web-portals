/**
 * The application loading component
 * @author gaurav sharma
 * @since 9th january 2018
 */
import { useAppSelector } from "../../store/hooks";
import "./index.scss";

const LoadingOverlay = () => {
  const loader = useAppSelector((state) => state.loader.active);
  return (
    <section
      className="loader-container"
      style={{ display: loader ? "block" : "none" }}
    >
      <div className="blocks">
        <div className="block orange"></div>
        <div className="block blue"></div>
      </div>
    </section>
  );
};

export default LoadingOverlay;
