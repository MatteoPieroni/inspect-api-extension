import React from 'react';

import { Data } from '../types';
import { DownloadButton } from './DownloadButton';
import './Controller.scss';
import { OrderController } from './OrderController';
import { FindDuplicates, Search as SearchInterface, OrderByKey } from '../hooks/utils/TableDataTypes';
import { ActiveFilter, HeaderKeys } from '../hooks/utils/tableReducers';
import Search from './Search';
import DuplicatesFilter from './DuplicatesFilter';

interface ControllerProps {
  onReset: () => void;
  headers: HeaderKeys;
  filterDuplicates: FindDuplicates;
  search: SearchInterface;
  dataToDownload?: Data[];
  activeFilter: ActiveFilter;
  onOrder: OrderByKey;
}

export const Controller: React.FC<ControllerProps> = ({
  onReset, filterDuplicates, headers, search, dataToDownload, activeFilter, onOrder,
}) => {

  return (
    <div className="controller">
      <div className="left">
        <Search onSearch={search} />
        <DuplicatesFilter filterDuplicates={filterDuplicates} />
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
