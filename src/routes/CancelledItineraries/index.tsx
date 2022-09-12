import { SET_NAVIGATION } from "../../store/slices/navigation";
import { useAppDispatch } from "../../store/hooks";
import { NAVIGATE } from "../../constants";
import { useEffect } from "react";

const CancelledItinerary = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(SET_NAVIGATION({ value: NAVIGATE.CANCELLED_ITINERARIES }));
  }, [dispatch]);

  return <main>cancelled itinerary</main>;
};

export default CancelledItinerary;
