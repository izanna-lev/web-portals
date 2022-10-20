import styles from "./index.module.scss";

type InputProps = {
  inputFields: {
    name: string;
    type: string;
    id: string;
    ref?: any;
    default?: any;
  };
};

const Toggle = ({ inputFields }: InputProps) => {
  return (
    <div className={styles["input-toggle-form"]}>
      <div className={styles["feild-heading"]}>{inputFields.name}</div>
      <input
        name={inputFields.id}
        type={inputFields.type}
        ref={inputFields.ref}
        defaultChecked={inputFields.default}
        className={styles["field-toggle-value"]}
        required
      />
    </div>
  );
};

export default Toggle;
