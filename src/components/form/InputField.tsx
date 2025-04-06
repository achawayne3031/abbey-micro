import { ChangeEvent, FC } from "react";
import "../../scss/form.scss";
import InfoIcon from "@mui/icons-material/Info";

interface InputProps {
  type: "text" | "number" | "email" | "password" | "date" | "time" | "file";
  label: string;
  value: string | number;
  name: string;
  placeholder: string;
  error: boolean;
  errorText: string | React.ReactElement | any;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  errorText,
  disabled,
  onChange,
}) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={label} className="input-label">
        {label}
      </label>

      <input
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className="input-text"
      />

      {Boolean(error && errorText) && (
        <>
          <p className="error">
            {" "}
            <InfoIcon className="error-icon" /> {errorText}
          </p>
        </>
      )}
    </div>
  );
};

export default InputField;
