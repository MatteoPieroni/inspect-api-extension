import React, { useState } from 'react'
import { FindDuplicates } from '../hooks/utils/TableDataTypes';
import { Checkbox } from './Checkbox';

interface DuplicatesFilterProps {
  filterDuplicates: FindDuplicates
}

const DuplicatesFilter: React.FC<DuplicatesFilterProps> = ({ filterDuplicates }) => {
  const [selectedValue, setSelectedValue] = useState<boolean>(false);

  const handleChange = () => {
    setSelectedValue(!selectedValue);
    filterDuplicates(!selectedValue ? 'url' : undefined)
  }

  return (
    <Checkbox label="Show only duplicate calls (url)" isChecked={selectedValue} onToggle={handleChange} />
  )
}

export default DuplicatesFilter
