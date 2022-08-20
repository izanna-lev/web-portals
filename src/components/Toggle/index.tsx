import "./index.scss";

type InputProps = {
  inputFeilds: {
    name: string
    type: string
    id: string
  }
}

const Toggle = ({inputFeilds}:InputProps) => {
  return (
    <div className="input-toggle-form">
      <div className="feild-heading">{inputFeilds.name}</div>
      <input
        name={inputFeilds.id}
        type={inputFeilds.type}
        className="field-toggle-value"
        autoFocus
        required
      />
    </div>
  );
};

export default Toggle;
