import getSearchParam from './getSearchParam';
import { Parameters, QueryParemeter, BuildListingOptions } from './models';

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
  queryParameters = [],
}: Parameters): Array<QueryParemeter> => {
  return [
    { name: 'page', value: page },
    { name: 'limit', value: limit },
    { name: 'sort_by', value: sort },
    {
      name: 'search',
      value: getSearchParam(search),
    },
    ...queryParameters,
  ];
};

const buildEndpoint = ({ baseEndpoint, queryParameters }): string => {
  return `${baseEndpoint}?${toRawQueryParameters(queryParameters)}`;
};

const buildListingEndpoint = ({
  baseEndpoint,
  paremeters,
  queryParameters,
}: BuildListingOptions): string => {
  return buildEndpoint({
    baseEndpoint,
    queryParameters: [
      ...getQueryParameters({ ...paremeters, queryParameters }),
    ],
  });
};

export default buildListingEndpoint;
