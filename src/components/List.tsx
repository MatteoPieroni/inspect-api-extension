import React from 'react';

import { Data } from '../types';
import { CallItem } from './CallItem';

interface ListProps {
  headers: (keyof Data)[];
  data: Data[];
  activeFilter: keyof Data | '';
  orderByKey: (header: keyof Data, isAsc?: boolean) => void;
}

const List: React.FC<ListProps> = ({ headers, data, activeFilter, orderByKey }) => {
  return (
    <div className="list-container">
      <div className="list-headers">
        {/* {data.map(call => <CallItem key={call.id} item={call} />)} */}
      </div>
      <div className="list">
        {data.map(call => <CallItem key={call.id} item={call} />)}
      </div>
    </div>
  )
}

export default List
