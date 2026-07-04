import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import './Button.css';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  disabled = false, 
  icon: Icon,
  className = '',
  ...props 
}, ref) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const stateClass = (isLoading || disabled) ? 'btn-disabled' : '';

  return (
    <button
      ref={ref}
      className={`${baseClass} ${variantClass} ${stateClass} ${className}`.trim()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="btn-icon spin" size={18} />
      ) : Icon ? (
        <Icon className="btn-icon" size={18} />
      ) : null}
      <span className="btn-text">{children}</span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
