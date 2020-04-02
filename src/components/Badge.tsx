import React from 'react';
import './Badge.scss';

enum Variants {
  warning,
  success,
  alert,
  default
}

interface BadgeProps {
  variant?: keyof typeof Variants
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  if (typeof children !== 'string') {
    throw new Error('Badge is meant to wrap only strings')
  }

  return (
    <span className={`badge ${variant !== 'default' ? variant : ''}`}>
      {children}
    </span>
  )
}

export default Badge
