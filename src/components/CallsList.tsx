import React from 'react'

import { Data } from '../types';
import { Controller } from './Controller';
import { useTableData } from '../hooks/useTableData';
import { Table } from './Table';
import List from './List';

interface CallsListProps {
  data: Data[];
  isTable?: boolean;
}

export const CallsList: React.FC<CallsListProps> = ({ data, isTable = true }) => {
  const { headerKeys, data: processedData, orderByKey, reset, activeFilter, findDuplicates, search } = useTableData(data);
  const headers: (keyof Data)[] = headerKeys.filter((element, index) => element !== 'id' && headerKeys.indexOf(element) === index);

  return (
    <div>
      <Controller onReset={reset} filterDuplicates={findDuplicates} headers={headers} search={search} dataToDownload={processedData} />
      {
        isTable ? (
          <Table headers={headers} data={processedData} activeFilter={activeFilter} orderByKey={orderByKey} />
        ) : (
            <List headers={headers} data={processedData} activeFilter={activeFilter} orderByKey={orderByKey} />
          )
      }
    </div>
  )
}