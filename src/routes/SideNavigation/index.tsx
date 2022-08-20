/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import { Outlet, NavLink } from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import Nav from "../nav/index";
import { useAppSelector } from "../../store/hooks";

type Props = {
  navPaths: Array<{
    key: number;
    path: string;
    name: string;
    state: number;
    element: JSX.Element;
    icon: JSX.Element;
  }>;
};
const SideNavigationPage = ({ navPaths }: Props) => {
  const show = useAppSelector(state => state.loader.value)

  
  return (
    <div className="screen">
      { show && <LoadingOverlay/>}
      <Nav />
      <div className="container">
        <div className="nav-menu">
          <ul className="nav-menu-items">
            {navPaths.map((item, index) => {
              return (
                <li key={index} className="nav-text">
                  <NavLink
                    className="nav-view-text"
                    to={item.path}
                    style={({ isActive }) => ({
                      color: isActive ? "#0b9dd8" : "#ffffff",
                      "backgroundColor": isActive ? "#ffffff" : "#0b9dd8",
                    })}
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SideNavigationPage;
