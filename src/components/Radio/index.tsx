import "./index.scss";

type InputProps = {
  inputFeilds: {
    name?: string;
    type?: string;
    id?: string;
  };
};

const Radio = ({ inputFeilds }: InputProps) => {
  return (
    <div className="input-radio-form">
        <input className="field-radio-value" type={inputFeilds.type} id={inputFeilds.id} name={inputFeilds.id} value={inputFeilds.id} /> {" "}
      <label className="input-radio-label" htmlFor={inputFeilds.id}>{inputFeilds.name}</label>
    </div>
  );
};

export default Radio;
