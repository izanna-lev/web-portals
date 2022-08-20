import styles from "./index.module.scss"

type InputProps = {
  inputFeilds: {
    name: string
    maxlength: number
    type: string
    id: string
    max?: number
  }
}

const TextArea = ({inputFeilds}:InputProps) => {
  return (
    <div className={styles["input-form"]}>
      <div className={styles["feild_heading"]}>{inputFeilds.name}</div>
      <textarea
        name={inputFeilds.id}
        maxLength={inputFeilds.maxlength}
        className={styles["textarea-value"]}
        autoFocus
        required
      />
    </div>
  );
};

export default TextArea;
