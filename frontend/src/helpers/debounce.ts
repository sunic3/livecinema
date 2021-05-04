import { useRef, useEffect } from 'react';
import { makeSearchReq } from '../services/requestMock';
import { makeRequestWithAbort } from './makeRequestWithAbort';
import { MovieShort } from '../interfaces';

const requester: (
  search: string
) => Promise<MovieShort[] | null> = makeRequestWithAbort(makeSearchReq);

export default function useDebouncedFunction(delay: number, cleanUp = false) {
  const timeoutRef: React.MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  > = useRef();

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  const debounce: (search: string) => Promise<MovieShort[] | null> = (
    search: string
  ) => {
    clearTimer();

    return new Promise((resolve) => {
      timeoutRef.current = setTimeout(() => resolve(requester(search)), delay);
    });
  };

  return debounce;
}

// export const debounce: <T>(fn: T, ms?: number) => () => Promise<unknown> = (
//   fn,
//   ms = 0
// ) => {
//   let timer: ReturnType<typeof setTimeout> | undefined;
//   let cancelled = false;
//
//   const debounced = <T>(...args: T[]) => {
//     cancelled = false;
//     if (timer) {
//       clearTimeout(timer);
//     }
//
//     return new Promise((resolve) => {
//       timer = setTimeout(() => {
//         if (!cancelled) {
//           // @ts-ignore
//           resolve(fn(...args));
//         }
//       }, ms);
//     });
//   };
//
//   debounced.cancel = () => {
//     cancelled = true;
//   };
//
//   return debounced;
// };
