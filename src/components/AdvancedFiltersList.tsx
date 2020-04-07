import React from 'react'
import { FindDuplicates, Regex } from '../hooks/utils/TableDataTypes'
import { AdvancedFilter } from './AdvancedFilter'

interface AdvancedFiltersListProps {
  filterDuplicates: FindDuplicates;
  regex: Regex;
}

export const AdvancedFiltersList: React.FC<AdvancedFiltersListProps> = ({ filterDuplicates, regex }) => {
  return (
    <div className="advanced-filters-list">
      <AdvancedFilter label="Show only insecure calls (http)" onChange={(value) => regex(value ? /^https:\/\/qa/g : '')} />
      <AdvancedFilter label="Show only duplicate calls (url)" onChange={(value) => filterDuplicates(value ? 'url' : undefined)} />
    </div>
  )
}
