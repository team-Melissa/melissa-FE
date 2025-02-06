import { debounce } from "es-toolkit";

export const preventDoublePress = <F extends (...args: any[]) => void>(fn: F) => {
  return debounce(fn, 500, { edges: ["leading"] });
};
