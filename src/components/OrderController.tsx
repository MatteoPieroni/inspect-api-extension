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
  activeOrder: ActiveFilter;
  handleReset: Reset;
}

export const OrderController: React.FC<OrderControllerProps> = ({ headers, onChange, activeOrder, handleReset }) => {
  const [orderIsAsc, setOrderIsAsc] = useState<boolean>(false);

  const handleClick = () => {
    if (activeOrder) {
      onChange(activeOrder, !orderIsAsc);
      setOrderIsAsc(!orderIsAsc);
    }
  }

  return (
    <div className="order-controller">
      <select value={activeOrder} onChange={(e) => onChange(e.target.value as keyof Data, orderIsAsc)}>
        <option value="" disabled>Order by</option>
        {headers.map(header => <option key={header} value={header}>{header}</option>)}
      </select>
      {activeOrder && (
        <IconButton
          icon={orderIsAsc ? <Icons.MoveUp /> : <Icons.MoveDown />}
          onClick={handleClick}
          action={orderIsAsc ? 'Set ascending order' : 'Set descending order'}
          className="order-icon"
        />
      )}
      {activeOrder && <IconButton
        icon={<Icons.Reset />}
        onClick={handleReset}
        action="Reset order"
        className="reset-order-icon"
      />}
    </div>
  )
}
