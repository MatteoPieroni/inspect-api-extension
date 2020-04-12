import React from 'react';

import { Data } from '../types';
import { DownloadButton } from './DownloadButton';
import './Controller.scss';
import { OrderController } from './OrderController';
import { FindDuplicates, Search as SearchInterface, OrderByKey, Regex } from '../hooks/utils/TableDataTypes';
import { ActiveFilter, HeaderKeys } from '../hooks/utils/tableReducers';
import Search from './Search';
import { AdvancedFiltersList } from './AdvancedFiltersList';

interface ControllerProps {
  onReset: () => void;
  headers: HeaderKeys;
  findDuplicates: FindDuplicates;
  search: SearchInterface;
  dataToDownload?: Data[];
  activeOrder: ActiveFilter;
  orderByKey: OrderByKey;
  regex: Regex;
}

export const Controller: React.FC<ControllerProps> = ({
  onReset, findDuplicates, headers, search, dataToDownload, activeOrder, orderByKey, regex,
}) => {

  return (
    <div className="controller">
      <div className="left">
        <Search onSearch={search} />
        <AdvancedFiltersList filterDuplicates={findDuplicates} regex={regex} />
        <OrderController headers={headers} activeOrder={activeOrder} onChange={orderByKey} handleReset={onReset} />
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
