import React, { useRef, useState } from 'react'

import { FindDuplicates, Regex } from '../hooks/utils/TableDataTypes'
import { AdvancedFilter } from './AdvancedFilter'

import './AdvancedFiltersList.scss';

interface AdvancedFiltersListProps {
  filterDuplicates: FindDuplicates;
  regex: Regex;
}

export const AdvancedFiltersList: React.FC<AdvancedFiltersListProps> = ({ filterDuplicates, regex }) => {
  const divRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <button className="button-link" onClick={() => setIsExpanded(!isExpanded)}>Advanced filters {isExpanded ? '▲' : '▼'}</button>
      {isExpanded && (
        <div className="advanced-filters-list" ref={divRef}>
          <AdvancedFilter label="Show only insecure calls (http)" onChange={(value) => regex(value ? /^http:\/\//g : '', 'insecure')} />
          <AdvancedFilter label="Show error calls" onChange={(value) => regex(value ? /error/ : '', 'error', 'status')} />
          <AdvancedFilter label="Show only duplicate calls (url)" onChange={(value) => filterDuplicates(value ? 'url' : undefined, 'url-duplicates')} />
        </div>
      )}
    </>
  )
}
