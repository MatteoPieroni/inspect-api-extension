import React from 'react'

import { Data } from '../types';
import { Controller } from './Controller';
import { useTableData } from '../hooks/useTableData';
import List from './List';

import './CallsList.scss';

interface CallsListProps {
  data: Data[];
}

export const CallsList: React.FC<CallsListProps> = ({ data }) => {
  const { headerKeys, data: processedData, orderByKey, reset, activeOrder, ...rest } = useTableData(data);
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
        activeOrder={activeOrder}
        {...rest}
      />
      <List data={processedData} />
    </div>
  )
}
