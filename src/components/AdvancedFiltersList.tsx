import React, { useRef } from 'react'

import { FindDuplicates, Regex } from '../hooks/utils/TableDataTypes'
import { useToggle } from '../hooks/useToggle'
import { AdvancedFilter } from './AdvancedFilter'

import './AdvancedFiltersList.scss';

interface AdvancedFiltersListProps {
  filterDuplicates: FindDuplicates;
  regex: Regex;
}

export const AdvancedFiltersList: React.FC<AdvancedFiltersListProps> = ({ filterDuplicates, regex }) => {
  const divRef = useRef(null);
  const { isExpanded, toggle } = useToggle(divRef);

  return (
    <>
      <button className="button-link" onClick={toggle}>Advanced filters {isExpanded ? '▲' : '▼'}</button>
      <div className="advanced-filters-list" ref={divRef}>
        <AdvancedFilter label="Show only insecure calls (http)" onChange={(value) => regex(value ? /^http:\/\//g : '')} />
        <AdvancedFilter label="Show only duplicate calls (url)" onChange={(value) => filterDuplicates(value ? 'url' : undefined)} />
      </div>
    </>
  )
}
