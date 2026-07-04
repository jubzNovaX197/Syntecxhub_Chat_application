import './Button.css';

const Button = ({ children, className = '', isLoading = false, type = 'button', ...props }) => {
  return (
    <button className={`button ${className}`} disabled={isLoading || props.disabled} type={type} {...props}>
      {isLoading ? <span className="button-spinner" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
