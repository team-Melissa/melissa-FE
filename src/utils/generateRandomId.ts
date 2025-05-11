/**
 * @description Toss 오픈소스 overlay-kit에서 참고한 key 생성 함수입니다.
 * @see https://github.com/toss/overlay-kit/blob/main/packages/src/utils/random-id.ts
 */
export const generateRandomId = () => {
  return Math.random().toString(36).slice(2, 11);
};
