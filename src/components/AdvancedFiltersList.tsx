import React from 'react'
import { FindDuplicates } from '../hooks/utils/TableDataTypes'
import { AdvancedFilter } from './AdvancedFilter'

interface AdvancedFiltersListProps {
  filterDuplicates: FindDuplicates;
}

export const AdvancedFiltersList: React.FC<AdvancedFiltersListProps> = ({ filterDuplicates }) => {

  return (
    <div className="advanced-filters-list">
      <AdvancedFilter label="Show only duplicate calls (url)" onChange={(value) => filterDuplicates(value ? 'url' : undefined)} />
    </div>
  )
}
