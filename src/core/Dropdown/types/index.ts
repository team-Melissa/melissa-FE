export type DropdownPos = {
  x: number;
  y: number;
  width: number;
};

export type DropdownContextValue = {
  isOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
  triggerPos: DropdownPos | null;
  setTriggerPos: (position: DropdownPos | null) => void;
};
