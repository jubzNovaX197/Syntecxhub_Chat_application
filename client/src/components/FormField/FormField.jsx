import './FormField.css';

const FormField = ({ error, id, label, ...inputProps }) => {
  return (
    <label className="form-field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...inputProps} />
      {error ? (
        <small id={`${id}-error`} role="alert">
          {error}
        </small>
      ) : null}
    </label>
  );
};

export default FormField;
