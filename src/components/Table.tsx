import React from 'react';

import { Data } from '../types';
import TableHeader from './TableHeader';
import { useTableData } from '../hooks/useTableData';
import TableController from './TableController';

interface TableProps {
  data: Data[];
}

export const Table: React.FC<TableProps> = ({ data }) => {
  const { headerKeys, data: processedData, orderByKey, reset, activeFilter, findDuplicates, search } = useTableData(data);
  const headers: (keyof Data)[] = headerKeys.filter((element, index) => element !== 'id' && headerKeys.indexOf(element) === index);

  return (
    <div>
      <TableController onReset={reset} filterDuplicates={findDuplicates} headers={headers} search={search} dataToDownload={processedData} />
      <table>
        {headers && (
          <thead>
            <tr>
              {headers.map(header => <TableHeader key={header} header={header} onClick={orderByKey} activeFilter={activeFilter} />)}
            </tr>
          </thead>
        )}
        <tbody>
          {processedData.map(row => (
            <tr key={row.id}>
              {Object.values(row).map(value => (
                value !== row.id && <td key={value}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
