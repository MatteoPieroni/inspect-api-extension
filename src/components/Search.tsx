import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Search as SearchInterface } from '../hooks/utils/TableDataTypes';
import { Icons } from './Icons';

import './Search.scss';

interface SearchProps {
  onSearch: SearchInterface;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [typedSearch, setTypedSearch] = useState<string>('');

  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setTypedSearch(e?.target.value || '')
    onSearch(e?.target.value || '')
  }

  const handleSubmit: (e: FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    onSearch(typedSearch)
  }

  const handleReset = () => {
    setTypedSearch('');
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search
        <div className="search-input-container">
          <input value={typedSearch} onChange={handleChange} />
          {typedSearch && (
            <button type="button" onClick={handleReset} className="button-icon search-reset">
              <Icons.Reset />
              <span className="visually-hidden">Reset</span>
            </button>
          )}
        </div>
      </label>
    </form >
  )
}

export default Search
