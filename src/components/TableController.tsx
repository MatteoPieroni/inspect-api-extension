import React, { useState } from 'react'
import { Data } from '../types';
import { DownloadButton } from './DownloadButton';
import { Checkbox } from './Checkbox';
import Button from './Button';
import { Icons } from './Icons';

interface TableControllerProps {
  onReset: () => void;
  headers: string[]
  filterDuplicates: (key: keyof Data | undefined) => void;
  search: (keyword: string) => void;
  dataToDownload?: Data[];
}

const TableController: React.FC<TableControllerProps> = ({ onReset, filterDuplicates, headers, search, dataToDownload }) => {
  const [selectedValue, setSelectedValue] = useState<boolean>(false);
  const [typedSearch, setTypedSearch] = useState<string>('');

  const handleChange = () => {
    setSelectedValue(!selectedValue);
    filterDuplicates(!selectedValue ? 'url' : undefined)
  }

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedSearch(e?.target.value || '');
    search(e?.target.value);
  }

  const handleReset = () => {
    setSelectedValue(false);
    setTypedSearch('');
    onReset();
  }

  return (
    <div className="controller">
      <div className="left">
        <label>
          Search
        <input value={typedSearch} onChange={handleType} />
        </label>
        <Checkbox label="Show only duplicate calls (url)" isChecked={selectedValue} onToggle={handleChange} />
        <Button icon={<Icons.Reset />} onClick={handleReset} isInverted>Reset</Button>
      </div>
      {dataToDownload && (
        <div className="right">
          <DownloadButton
            data={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataToDownload, null, 4))}`}
            text="json"
          />
        </div>
      )}
    </div>
  )
}

export default TableController
