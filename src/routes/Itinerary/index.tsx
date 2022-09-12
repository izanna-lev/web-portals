import { SET_NAVIGATION } from "../../store/slices/navigation";
import { useAppDispatch } from "../../store/hooks";
import { NAVIGATE } from "../../constants";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const Itinerary = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(SET_NAVIGATION({ value: NAVIGATE.ITINERARY }));
  }, [dispatch]);

  return <Outlet />;
};

export default Itinerary;
