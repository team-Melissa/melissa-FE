import { DropdownItem } from "./components/DropdownItem";
import { DropdownMenu } from "./components/DropdownMenu";
import { DropdownRoot } from "./components/DropdownRoot";
import { DropdownTrigger } from "./components/DropdownTrigger";

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
});
