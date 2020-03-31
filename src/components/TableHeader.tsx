import React, { useState, useEffect } from 'react'
import { Data } from '../types';
import { Icons } from './Icons';

interface TableHeaderProps {
  header: keyof Data;
  onClick?: (header: keyof Data, isAscendingOrder?: boolean) => void;
  activeFilter: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ header, onClick, activeFilter }) => {
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);

  // reset the order to ascending any time the activeFilter changes
  useEffect(() => {
    if (!activeFilter) {
      setIsAscendingOrder(true);
    }
  }, [activeFilter])

  const handleClick: (event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => void = (e) => {
    if (typeof onClick === 'function') {
      setIsAscendingOrder(!isAscendingOrder);
      onClick(header, !isAscendingOrder);
    }
  };

  return (
    <td onClick={handleClick}>
      {header}
      {activeFilter === header && (
        isAscendingOrder ? <Icons.MoveUp /> : <Icons.MoveDown />
      )}
      <span />
    </td>
  )
}

export default TableHeader
