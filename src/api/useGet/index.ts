import * as React from 'react';

import axios from 'axios';
import { pathOr, isNil, cond, T } from 'ramda';

import { useCancelTokenSource, Severity, getData } from '../..';
import useSnackbar from '../../Snackbar/useSnackbar';

export interface GetData {
  onSuccess: (retrievedEntity) => void;
  onFailure?: (error) => void;
  endpoint: string;
  defaultLabelFailure?: string;
}

export interface GetResult {
  get: () => Promise<void>;
  fetching: boolean;
}

const useGet = <TData>({
  onSuccess,
  onFailure = undefined,
  endpoint,
  defaultLabelFailure = 'Oops, something went wrong',
}: GetData): GetResult => {
  const { token, cancel } = useCancelTokenSource();
  const { showMessage } = useSnackbar();

  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    return (): void => cancel();
  }, []);

  const get = (): Promise<void> => {
    setFetching(true);

    return getData<TData>({
      endpoint,
      requestParams: { cancelToken: token },
    })
      .then((entity) => {
        onSuccess(entity);
      })
      .catch((error) => {
        const message = pathOr(defaultLabelFailure, [
          'response',
          'data',
          'message',
        ])(error);

        const showErrorMessage = (): void =>
          showMessage({
            message,
            severity: Severity.error,
          });

        cond([
          [axios.isCancel, T],
          [(): boolean => isNil(onFailure), showErrorMessage],
          [T, (): void => onFailure?.(message)],
        ])(error);
      })
      .finally(() => setFetching(false));
  };

  return { get, fetching };
};

export default useGet;
