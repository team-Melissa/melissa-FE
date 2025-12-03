import { useState } from 'react';
import { View, type ViewProps } from 'react-native';
import { DropdownContext } from '../context/DropdownContext';
import { useAndroidBackHandler } from '../hooks/useAndroidBackHandler';
import type { DropdownPos } from '../types';

export const DropdownRoot = ({ children, ...props }: ViewProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [triggerPos, setTriggerPos] = useState<DropdownPos | null>(null);

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);

  const value = { isOpen, openDropdown, closeDropdown, triggerPos, setTriggerPos };

  useAndroidBackHandler(isOpen, closeDropdown);

  return (
    <DropdownContext.Provider value={value}>
      <View {...props}>{children}</View>
    </DropdownContext.Provider>
  );
};
