import React, { useState } from 'react';

import { Data } from '../types';
import { DownloadButton } from './DownloadButton';
import { Checkbox } from './Checkbox';
import Button from './Button';
import { Icons } from './Icons';
import './Controller.scss';
import OrderController from './OrderController';
import { FindDuplicates, Search, OrderByKey } from '../hooks/utils/TableDataTypes';
import { ActiveFilter, HeaderKeys } from '../hooks/utils/tableReducers';

interface ControllerProps {
  onReset: () => void;
  headers: HeaderKeys;
  filterDuplicates: FindDuplicates;
  search: Search;
  dataToDownload?: Data[];
  activeFilter: ActiveFilter;
  onOrder: OrderByKey;
}

export const Controller: React.FC<ControllerProps> = ({
  onReset, filterDuplicates, headers, search, dataToDownload, activeFilter, onOrder,
}) => {
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

  return (
    <div className="controller">
      <div className="left">
        <label>
          Search
          <input value={typedSearch} onChange={handleType} />
          {typedSearch && <Button icon={<Icons.Reset />} isInverted onClick={() => setTypedSearch('')}>Reset</Button>}
        </label>
        <Checkbox label="Show only duplicate calls (url)" isChecked={selectedValue} onToggle={handleChange} />
        <OrderController headers={headers} activeFilter={activeFilter} onChange={onOrder} handleReset={onReset} />
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
