import getSearchQueryParameterValue from './getSearchParam';
import {
  Parameters,
  QueryParemeter,
  BuildListingEndpointParameters,
} from './models';

const toQueryParameter = ({ name, value }): string => {
  return `${name}=${JSON.stringify(value)}`;
};

const toRawQueryParameters = (queryParameters): Array<string> =>
  queryParameters
    .filter(({ value }) => value !== undefined && value.length !== 0)
    .map(toQueryParameter)
    .join('&');

const getQueryParameters = ({
  sort,
  page,
  limit,
  search,
  customQueryParameters = [],
}: Parameters): Array<QueryParemeter> => {
  return [
    { name: 'page', value: page },
    { name: 'limit', value: limit },
    { name: 'sort_by', value: sort },
    {
      name: 'search',
      value: getSearchQueryParameterValue(search),
    },
    ...customQueryParameters,
  ];
};

const buildEndpoint = ({ baseEndpoint, queryParameters }): string => {
  return `${baseEndpoint}?${toRawQueryParameters(queryParameters)}`;
};

const buildListingEndpoint = ({
  baseEndpoint,
  parameters,
  queryParameters,
}: BuildListingEndpointParameters): string => {
  return buildEndpoint({
    baseEndpoint,
    queryParameters: [
      ...getQueryParameters({ ...paremeters, queryParameters }),
    ],
  });
};

export default buildListingEndpoint;
