import { FC } from 'react';

import styles from './orders-list.module.css';

import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';
import { Link, useLocation } from 'react-router-dom';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => (
  // const location = useLocation();
  <div className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <OrderCard order={order} key={order._id} />
    ))}
  </div>
);
