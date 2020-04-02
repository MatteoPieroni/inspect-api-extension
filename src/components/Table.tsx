import React from 'react';

import { Data } from '../types';
import TableHeader from './TableHeader';
import './Table.scss';

interface TableProps {
  headers: (keyof Data)[];
  data: Data[];
  activeFilter: keyof Data | '';
  orderByKey: (header: keyof Data, isAsc?: boolean) => void;
}

export const Table: React.FC<TableProps> = ({ headers, activeFilter, data, orderByKey }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map(header => <TableHeader key={header} header={header} onClick={orderByKey} activeFilter={activeFilter} />)}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
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
