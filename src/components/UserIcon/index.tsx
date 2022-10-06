import React from "react";
import { ICON, IMAGE } from "../../constants";

const styles = (width: string, height: string) => {
  return {
    width: width || "3rem",
    height: height || "3rem",
    borderRadius: "50%",
  };
};

export const UserIcon = ({ image, width, height }: any) => {
  return (
    <img
      alt="user"
      loading="lazy"
      className="user-image"
      style={styles(width, height)}
      src={`${IMAGE.SMALL}${image}`}
      onError={(e: any) => (e.target.src = ICON.USER_PLACEHOLDER)}
    />
  );
};
