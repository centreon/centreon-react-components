import {
  renderHook,
  act,
  RenderHookResult,
} from '@testing-library/react-hooks';

import axios from 'axios';

import useGet, { GetResult, GetData } from '.';
import { Severity } from '../..';

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedShowMessage = jest.fn();

jest.mock('../../Snackbar/useSnackbar', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(() => ({ showMessage: mockedShowMessage })),
}));

const endpoint = 'endpoint';
const onSuccess = jest.fn();

const renderUseGet = ({
  onFailure,
  defaultLabelFailure,
}: Pick<GetData, 'onFailure' | 'defaultLabelFailure'>): RenderHookResult<
  unknown,
  GetResult
> =>
  renderHook(() =>
    useGet({
      onSuccess,
      endpoint,
      onFailure,
      defaultLabelFailure,
    }),
  );

describe(useGet, () => {
  it('calls the given onSuccess callback when the get request succeeds', async () => {
    mockedAxios.get.mockResolvedValue({ data: 'success' });

    const { result } = renderUseGet({});

    await act(async () => result.current.get());

    expect(mockedAxios.get).toHaveBeenCalledWith(endpoint, expect.anything());
    expect(onSuccess).toHaveBeenCalledWith('success');
  });

  it('calls the given onFailure callback when it is passed and the get request fails', async () => {
    mockedAxios.get.mockRejectedValue({
      response: { data: { message: 'failure' } },
    });
    const onFailure = jest.fn();

    const { result } = renderUseGet({ onFailure });

    await act(async () => result.current.get());

    expect(onFailure).toHaveBeenCalledWith('failure');
  });

  it('shows an error via the Snackbar when the onFailure callback is not passed and the get request fails', async () => {
    mockedAxios.get.mockRejectedValue({
      response: { data: { message: 'failure' } },
    });
    const { result } = renderUseGet({});

    await act(async () => result.current.get());

    expect(mockedShowMessage).toHaveBeenCalledWith({
      message: 'failure',
      severity: Severity.error,
    });
  });

  it('shows the given default error message when the get request fails and no message is returned from the API', async () => {
    mockedAxios.get.mockRejectedValue({});
    const { result } = renderUseGet({ defaultLabelFailure: 'Oops' });

    await act(async () => result.current.get());

    expect(mockedShowMessage).toHaveBeenCalledWith({
      message: 'Oops',
      severity: Severity.error,
    });
  });
});
