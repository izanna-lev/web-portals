/**
 * This component represents a sample image component for application
 */
import DefaultImage from "../../assets/images/profile.png";
import React, { useEffect, useState } from "react";
import { browserHistory } from "react-router";
import PropTypes from "prop-types";
import "./index.scss";

const CustomImage = (props) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    setImage(props.image || DefaultImage);
  }, [props.image]);

  const classNames = `litnite-image ${props.className && props.className}`;
  const { width = "50", height = "50" } = props;

  return (
    <img
      className={classNames}
      src={image}
      style={{ width, height }}
      // onError={() => setState({ image: DefaultImage })}
      // onClick={() => browserHistory.push("/dashboard")}
    />
  );
};

CustomImage.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  radius: PropTypes.number,
};

export default CustomImage;
