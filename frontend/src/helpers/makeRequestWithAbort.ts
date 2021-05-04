import { MovieShort } from '../interfaces';

export const makeRequestWithAbort = (fn: {
  (search: string, signal: AbortSignal): Promise<null | MovieShort[]>;
  (arg0: string, arg1: AbortSignal): any;
}) => {
  let abortController = new AbortController();

  return (search: string) => {
    abortController.abort();
    abortController = new AbortController();

    return fn(search, abortController.signal);
  };
};
