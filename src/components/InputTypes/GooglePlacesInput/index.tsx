/**
 * @desc Custom Google Places Component
 * @author Shivender
 * @param {*} name
 * @param {*} setLocation
 */

import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { GOOGLE_API } from "../../../constants";
import { truncateString } from "../../../util";
import { useRef, useState } from "react";
import styles from "./index.module.scss";
import InputForm from "../InputForm";
import ReactDOM from "react-dom";
import { ICON } from "../../../assets/index";

interface GooglePlacesPredictionsProps {
  item: any;
  key: number;
  getPlaceDetails: Function;
}

// Place Prediction Component
const GooglePlacesPredictions = (props: GooglePlacesPredictionsProps) => {
  const { item, getPlaceDetails } = props;

  return (
    <div
      onClick={() => getPlaceDetails(item)}
      className={styles["prediction-place"]}
    >
      <img
        src={ICON.LOCATION_PIN}
        alt="Location : "
        className={styles["location-pin"]}
      />
      <span className={styles["location-name"]}>
        {truncateString(item.description, 65, "...")}
      </span>
    </div>
  );
};

interface GooglePlacesInputProps {
  name?: string;
  setLocation: Function;
  defaultValue?: string;
}

// Google Places Input Component
const GooglePlacesInput = (props: GooglePlacesInputProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [placeSelected, setPlaceSelected] = useState(false);
  const { name, setLocation, defaultValue } = props;

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: GOOGLE_API,
    debounce: 500,
  });

  const getPlaceDetails = (place: any) => {
    // Set place_id to hide predictions.
    setPlaceSelected(true);

    // Setting the current input value to selected place description
    if (ref.current) ref.current.value = place.description;

    if (placesService && place.place_id)
      // Fetch place details for the selected place.

      placesService.getDetails(
        { placeId: place.place_id },
        (placeDetails: any) => {
          if (placeDetails) {
            // Destructure "placedetails" object for "latitude" and "longitude" methods
            const {
              geometry: {
                location: { lat, lng },
              },
            } = placeDetails;

            // Extract place details in desired format
            const newLocationObj = {
              location: place.description,
              type: "Point",
              coordinates: [Math.abs(lng()), Math.abs(lat())],
            };

            // Set the object to the passed setState from other components
            setLocation(newLocationObj);
          }
        }
      );
  };

  return (
    <>
      <InputForm
        inputFields={{
          name: name || "",
          id: `google-place-${name?.toLowerCase().split(" ").join("-")}`,
          type: "text",
          placeholder: "",
          onChange: (value: any) => {
            setPlaceSelected(false);
            getPlacePredictions({ input: value });
          },
          ref,
          default: defaultValue || "",
        }}
      />
      <div className={styles["predictions-wrapper"]}>
        <div className={styles["all-places-predictions"]}>
          {/* Show or Hide Predictions */}
          {!placeSelected && !isPlacePredictionsLoading
            ? placePredictions.map((item, index) => (
                // Return Every Prediction
                <GooglePlacesPredictions
                  key={index}
                  item={item}
                  getPlaceDetails={getPlaceDetails}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default GooglePlacesInput;

// Google Places Input Component for Add/Edit Activity page
export const ActivityPlacesInput = (props: GooglePlacesInputProps) => {
  const placeInputRef = useRef<HTMLInputElement | null>(null);

  const [inputPosition, setInputPosition] = useState<any>({ top: 0, left: 0 });
  const [predictionsFocus, setPredictionsFocus] = useState(false);
  const [placeSelected, setPlaceSelected] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const { setLocation, defaultValue } = props;

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: GOOGLE_API,
    debounce: 500,
  });

  const getPlaceDetails = (place: any) => {
    // Set place_id to hide predictions.
    setPlaceSelected(true);

    // Setting the current input value to selected place description
    if (placeInputRef.current) placeInputRef.current.value = place.description;

    if (placesService && place.place_id)
      // Fetch place details for the selected place.

      placesService.getDetails(
        { placeId: place.place_id },
        (placeDetails: any) => {
          if (placeDetails) {
            // Destructure "placedetails" object for "latitude" and "longitude" methods
            const {
              geometry: {
                location: { lat, lng },
              },
            } = placeDetails;

            // Extract place details in desired format
            const newLocationObj = {
              location: place.description,
              type: "Point",
              coordinates: [Math.abs(lng()), Math.abs(lat())],
            };

            // Set the object to the passed setState from other components
            setLocation(newLocationObj);
          }
        }
      );
  };

  const showPredictions = () =>
    (inputFocus || predictionsFocus) &&
    !placeSelected &&
    !isPlacePredictionsLoading;

  return (
    <div>
      <input
        required
        type="text"
        placeholder=""
        id="google-place"
        ref={placeInputRef}
        name="activity-location"
        defaultValue={defaultValue || ""}
        onBlur={() => setInputFocus(false)}
        className="day-blank edit-background"
        onChange={(e: any) => {
          placeSelected && setPlaceSelected(false);
          getPlacePredictions({ input: e.target.value });
        }}
        onFocus={() => {
          setInputFocus(true);
          setPredictionsFocus(false);
          if (placeInputRef.current)
            setInputPosition(placeInputRef.current.getBoundingClientRect());
        }}
      />

      {/* Show or Hide Predictions */}
      {showPredictions()
        ? ReactDOM.createPortal(
            <div
              className={styles["activity-location-wrapper"]}
              style={{
                top: `${inputPosition.y + 80}px`,
                left: `${inputPosition.x}px`,
              }}
              onMouseEnter={() => setPredictionsFocus(true)}
              onMouseLeave={() => setPredictionsFocus(false)}
            >
              <div className={styles["all-places-predictions"]}>
                {placePredictions.map((item, index) => (
                  // Return Every Prediction
                  <GooglePlacesPredictions
                    key={index}
                    item={item}
                    getPlaceDetails={getPlaceDetails}
                  />
                ))}
              </div>
            </div>,
            document.getElementById("overlay-root") as HTMLDivElement
          )
        : null}
    </div>
  );
};
