import React from 'react';

import { Data } from '../types';
import { CallItem } from './CallItem';

interface ListProps {
  data: Data[];
}

const List: React.FC<ListProps> = ({ data }) => {
  return (
    <div className="list-container">
      <div className="list-headers">
      </div>
      <div className="list">
        {data.map(call => <CallItem key={call.id} item={call} />)}
      </div>
    </div>
  )
}

export default List
