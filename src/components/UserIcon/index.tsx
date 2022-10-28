import { IMAGE } from "../../constants";
import { ICON } from "../../assets/index";
import style from "./index.module.scss";

const styles = (width: string, height: string) => {
  return {
    width: width || "3rem",
    height: height || "3rem",
  };
};
const src = ({ image, icon }: { image: string; icon: string }) => {
  if (image) return `${IMAGE.SMALL}${image}`;
  if (icon) return icon;
  return ICON.USER_PLACEHOLDER;
};

export const UserIcon = ({ image, icon, width, height }: any) => {
  return (
    <img
      alt="user"
      loading="lazy"
      className={`user-image ${style["user-icon"]}`}
      style={styles(width, height)}
      src={src({ image, icon })}
      onError={(e: any) => {
        e.target.src = ICON.USER_PLACEHOLDER;
      }}
      width={width || "3rem"}
      height={height || "3rem"}
    />
  );
};
