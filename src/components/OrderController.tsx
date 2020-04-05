import React, { useState } from 'react'
import { Data } from '../types'
import { Icons } from './Icons'
import { HeaderKeys, ActiveFilter } from '../hooks/utils/tableReducers';
import { OrderByKey, Reset } from '../hooks/utils/TableDataTypes';
import Button from './Button';

interface OrderControllerProps {
  headers: HeaderKeys;
  onChange: OrderByKey;
  activeFilter: ActiveFilter;
  handleReset: Reset;
}

const OrderController: React.FC<OrderControllerProps> = ({ headers, onChange, activeFilter, handleReset }) => {
  const [orderIsAsc, setOrderIsAsc] = useState<boolean>(false);

  const handleClick = () => {
    if (activeFilter) {
      onChange(activeFilter, !orderIsAsc);
      setOrderIsAsc(!orderIsAsc);
    }
  }

  return (
    <div>
      <select value={activeFilter} onChange={(e) => onChange(e.target.value as keyof Data, orderIsAsc)}>
        <option value="" disabled selected>Order by</option>
        {headers.map(header => <option key={header} value={header}>{header}</option>)}
      </select>
      {activeFilter && (
        <button onClick={handleClick}>
          {orderIsAsc ? <Icons.MoveUp /> : <Icons.MoveDown />}
        </button>
      )}
      <Button icon={<Icons.Reset />} onClick={handleReset} isInverted>Reset</Button>
    </div>
  )
}

export default OrderController
