import { createContext, useContext } from "react";
import type { DropdownContextValue } from "../types";

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("<DropdownRoot> 내부에서만 사용 가능합니다.");
  return context;
};
