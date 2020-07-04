import React from 'react';

import axios from 'axios';
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from '@testing-library/react';

import { act } from 'react-test-renderer';
import SingleInfiniteAutocomplete from './Single';
import { SelectEntry } from '../..';
import buildListingEndpoint from '../../../../api/buildListingEndpoint';

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.CancelToken = jest.requireActual('axios').CancelToken;

const cancelTokenRequestParam = {
  cancelToken: { promise: Promise.resolve({}) },
};

const label = 'Connected Autocomplete';

const optionsData = {
  result: [
    { id: 0, name: 'My Option 1' },
    { id: 1, name: 'My Option 2' },
  ],
  meta: {
    pagination: {
      limit: 2,
      page: 1,
      total: 20,
    },
  },
};

const baseEndpoint = 'endpoint';
const getEndpoint = (params): string =>
  buildListingEndpoint({ baseEndpoint, params });

const renderSingleInfiniteAutocompleteField = (): RenderResult =>
  render(
    <SingleInfiniteAutocomplete
      label={label}
      initialPage={1}
      getEndpoint={getEndpoint}
      getOptionsFromResult={(result): Array<SelectEntry> => result}
      placeholder="Type here..."
    />,
  );

describe('Infinite Autocomplete', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: optionsData,
    });
  });

  afterEach(() => {
    mockedAxios.get.mockReset();
  });

  it('populates options with the first page result of get call from endpoint', async () => {
    const {
      getByLabelText,
      getByText,
    } = renderSingleInfiniteAutocompleteField();

    act(() => {
      fireEvent.click(getByLabelText('Open'));
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${baseEndpoint}?page=1`,
      cancelTokenRequestParam,
    );

    await waitFor(() => {
      expect(getByText('My Option 1')).toBeInTheDocument();
    });
  });
});
