import React, { useState } from 'react'
import { Data } from '../types'
import { Icons } from './Icons'
import { HeaderKeys, ActiveFilter } from '../hooks/utils/tableReducers';
import { OrderByKey, Reset } from '../hooks/utils/TableDataTypes';
import { IconButton } from './IconButton';

import './OrderController.scss'

interface OrderControllerProps {
  headers: HeaderKeys;
  onChange: OrderByKey;
  activeFilter: ActiveFilter;
  handleReset: Reset;
}

export const OrderController: React.FC<OrderControllerProps> = ({ headers, onChange, activeFilter, handleReset }) => {
  const [orderIsAsc, setOrderIsAsc] = useState<boolean>(false);

  const handleClick = () => {
    if (activeFilter) {
      onChange(activeFilter, !orderIsAsc);
      setOrderIsAsc(!orderIsAsc);
    }
  }

  return (
    <div className="order-controller">
      <select value={activeFilter} onChange={(e) => onChange(e.target.value as keyof Data, orderIsAsc)}>
        <option value="" disabled>Order by</option>
        {headers.map(header => <option key={header} value={header}>{header}</option>)}
      </select>
      {activeFilter && (
        <IconButton
          icon={orderIsAsc ? <Icons.MoveUp /> : <Icons.MoveDown />}
          onClick={handleClick}
          action={orderIsAsc ? 'Set ascending order' : 'Set descending order'}
          className="order-icon"
        />
      )}
      {activeFilter && <IconButton
        icon={<Icons.Reset />}
        onClick={handleReset}
        action="Reset order"
        className="reset-order-icon"
      />}
    </div>
  )
}
