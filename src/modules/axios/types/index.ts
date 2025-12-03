export type PendingApiCallback = {
  onRefreshSuccess: (accessToken: string) => void;
  onRefreshError: () => void;
};
