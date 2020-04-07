import React from 'react'

interface IconButtonProps {
  icon: React.ReactElement;
  className?: string;
  onClick: () => void;
  action: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, className, onClick, action }) => {
  return (
    <>
      <button type="button" onClick={onClick} className={`button-icon ${className ? className : ''}`}>
        {Icon}
        <span className="visually-hidden">{action}</span>
      </button>
    </>
  )
}
