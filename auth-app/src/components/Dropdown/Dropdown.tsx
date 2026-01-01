import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import styles from './Dropdown.module.css';

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button 
        className={`${styles.dropdownButton} ${isOpen ? styles.active : ''}`}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {title}
        <span className={`${styles.arrow} ${isOpen ? styles.rotate : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;