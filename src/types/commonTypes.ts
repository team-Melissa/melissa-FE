export type SuccessResponse = {
  isSuccess: true;
  code: string;
  message: string;
};

export type ErrorResponse = {
  isSuccess: false;
  code: string;
  message: string;
};
