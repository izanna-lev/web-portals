/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import "./index.scss";

type Props = {}
const Nav = ({}: Props) => {
  return (
    <section className="navBar" id="navBar">
      <div className="nav-head">Onsite Travel</div>
      <div></div>
    </section>
  );
};

// handles the outgoing dispatches
const mapDispatchToProps = () => {
  return {};
};

// handles incoming state changes
const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
