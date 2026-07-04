import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './Input.css';

const Input = forwardRef(({
  label,
  error,
  hint,
  type = 'text',
  icon: Icon,
  required,
  disabled,
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  
  const id = props.id || props.name;

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        {Icon && <Icon className="input-icon-left" size={18} />}
        
        <input
          ref={ref}
          id={id}
          type={inputType}
          disabled={disabled}
          className={`input-field ${Icon ? 'has-icon-left' : ''} ${isPassword ? 'has-icon-right' : ''} ${error ? 'input-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="input-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex="-1"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="input-message error-message" role="alert">
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p id={`${id}-hint`} className="input-message hint-message">
          {hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
