import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} />
          <p className='text text_type_main-default ml-2 mr-10'>
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive ? styles.link_active : styles.link
              }
            >
              Конструктор
            </NavLink>
          </p>
        </>
        <>
          <ListIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            <NavLink
              to={'/feed'}
              className={({ isActive }) =>
                isActive ? styles.link_active : styles.link
              }
            >
              Лента заказов
            </NavLink>
          </p>
        </>
      </div>
      <div className={styles.logo}>
        <NavLink
          to={'/login'}
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
        >
          <Logo className='' />
        </NavLink>
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon type={'primary'} />
        <p className='text text_type_main-default ml-2'>
          <NavLink
            to={'/profile'}
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            {userName || 'Личный кабинет'}
          </NavLink>
        </p>
      </div>
    </nav>
  </header>
);
