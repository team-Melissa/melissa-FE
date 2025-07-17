type Fn = (...args: any[]) => void;

/**
 * @description leading 방식의 debounce함수입니다.
 *
 * 첫 실행 이후 delay 동안 실행을 막는 역할입니다.
 */
export const debounce = <F extends Fn>(callbackFn: F, delay: number = 500) => {
  let timer: NodeJS.Timeout | null = null;
  let called: boolean = false;

  return () => {
    if (!called) {
      callbackFn();
      called = true;
    }
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      called = false;
    }, delay);
  };
};
