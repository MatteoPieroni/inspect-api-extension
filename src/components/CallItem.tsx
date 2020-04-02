import React from 'react';

import { Data } from '../types';
import Badge from './Badge';
import './CallItem.scss';

interface CallItemProps {
  item: Data
}

export const CallItem: React.FC<CallItemProps> = ({ item }) => {
  const { url, status, method } = item;

  const statusVariant = status === 'pending' ? 'warning' : status === 'complete' ? 'success' : 'alert';

  return (
    <div className="call">
      <div className="body">{url}</div>
      <div className="footer">
        {method && <Badge>{method}</Badge>}
        {status && <Badge variant={statusVariant} >{status}</Badge>}
      </div>
    </div>
  )
}
