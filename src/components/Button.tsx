import React from 'react';
import './Button.scss';

interface ButtonProps {
  icon?: React.ReactElement;
  children: string;
  onClick: () => void;
  isInverted?: boolean;
}

const Button: React.FC<ButtonProps> = ({ icon, children, onClick, isInverted }) => {
  return (
    <button onClick={onClick} className={isInverted ? 'button-inverted' : ''}>
      {icon}
      {children}
    </button>
  )
}

export default Button
