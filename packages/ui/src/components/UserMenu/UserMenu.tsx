/**
 * @file packages/ui/src/components/UserMenu/UserMenu.tsx
 * @purpose User dropdown menu.
 * @interface User controls
 * @phase 6
 */
import React from 'react';
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';
import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import styles from './UserMenu.module.css';

export interface UserMenuProps {
  userName: string;
  userEmail: string;
  avatarSrc?: string;
  onSelect: (value: string) => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  userName,
  userEmail,
  avatarSrc,
  onSelect,
}) => {
  const items: DropdownItem[] = [
    { value: 'profile', label: 'Profile', icon: <Icon name="User" size={16} /> },
    { value: 'settings', label: 'Settings', icon: <Icon name="Settings" size={16} /> },
    { value: 'logout', label: 'Log Out', icon: <Icon name="LogOut" size={16} /> },
  ];

  const trigger = (
    <button className={styles.trigger}>
      <Avatar name={userName} src={avatarSrc} size="md" />
      <div className={styles.userInfo}>
        <span className={styles.userName}>{userName}</span>
        <span className={styles.userEmail}>{userEmail}</span>
      </div>
      <Icon name="ChevronDown" size={16} className={styles.chevron} />
    </button>
  );

  return (
    <Dropdown
      trigger={trigger}
      items={items}
      onSelect={onSelect}
      placement="bottom-end"
    />
  );
};
