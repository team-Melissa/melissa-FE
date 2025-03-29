export type ObjectNonNullable<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
