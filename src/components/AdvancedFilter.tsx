import React, { useState } from 'react'
import { Checkbox } from './Checkbox';

interface AdvancedFilterProps {
  label: string;
  onChange: (value: boolean) => void;
}

export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ label, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<boolean>(false);

  const handleChange = () => {
    setSelectedValue(!selectedValue);
    onChange(!selectedValue)
  }

  return (
    <Checkbox label={label} isChecked={selectedValue} onToggle={handleChange} />
  )
}
