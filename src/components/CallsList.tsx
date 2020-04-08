import React from 'react'

import { Data } from '../types';
import { Controller } from './Controller';
import { useTableData } from '../hooks/useTableData';
import { Table } from './Table';
import List from './List';

import './CallsList.scss';

interface CallsListProps {
  data: Data[];
  isTable?: boolean;
}

export const CallsList: React.FC<CallsListProps> = ({ data, isTable = true }) => {
  const { headerKeys, data: processedData, orderByKey, reset, activeFilter, ...rest } = useTableData(data);
  const headers: (keyof Data)[] = headerKeys.filter((element, index) => element !== 'id' && headerKeys.indexOf(element) === index);

  return (
    <div className="calls-list" style={{
      width: window.innerWidth * .4
    }}>
      <Controller
        onReset={reset}
        headers={headers}
        dataToDownload={processedData}
        orderByKey={orderByKey}
        activeFilter={activeFilter}
        {...rest}
      />
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
