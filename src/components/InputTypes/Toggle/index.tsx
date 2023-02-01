import { useState } from "react";
import styles from "./index.module.scss";

type InputProps = {
  inputFields: {
    name: string;
    type: string;
    id: string;
    ref?: any;
    default?: any;
    required?: boolean;
  };
};

const Toggle = ({ inputFields }: InputProps) => {
  const [checked, setchecked] = useState(() =>
    inputFields.default ? true : false
  );

  return (
    <div className={styles["input-toggle-form"]}>
      <div className={styles["feild-heading"]}>{inputFields.name}</div>
      <input
        name={inputFields.id}
        type={inputFields.type}
        ref={inputFields.ref}
        defaultChecked={inputFields.default}
        className={`${styles["field-toggle-value"]} ${
          checked && styles["toggle-checked"]
        }`}
        onChange={(e) => setchecked(e.target.checked)}
        required={inputFields.required}
      />
    </div>
  );
};

export default Toggle;
