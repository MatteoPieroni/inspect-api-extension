import React from 'react';

import { Data } from '../types';
import Badge from './Badge';
import './CallItem.scss';

interface CallItemProps {
  item: Data
}

export const CallItem: React.FC<CallItemProps> = ({ item }) => {
  const { url, status, id, ...rest } = item;

  const statusVariant = status === 'pending' ? 'warning' : status === 'complete' ? 'success' : 'alert';

  return (
    <div className="call">
      <div className="body">{url}</div>
      <div className="footer">
        {rest && Object.values(rest).sort().map(value => <Badge key={value}>{value}</Badge>)}
        {status && <Badge variant={statusVariant} >{status}</Badge>}
      </div>
    </div>
  )
}
