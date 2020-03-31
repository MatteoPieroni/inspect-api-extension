import React, { useState } from 'react'
import { Icons } from './Icons';

interface CheckboxProps {
  isChecked: boolean;
  onToggle: () => void;
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, onToggle }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle();
  }

  return (
    <label className="checkbox">
      {label}
      {isChecked ? <Icons.CheckboxChecked /> : <Icons.CheckboxUnchecked />}
      <input className="visually-hidden" type="checkbox" checked={isChecked} onChange={handleChange} />
    </label>
  )
}
