import getSearchParam from './getSearchParam';
import { Listing, Param, BuildListingOptions } from './models';

const buildParam = ({ name, value }): string => {
  return `${name}=${JSON.stringify(value)}`;
};

const buildParams = (params): Array<string> =>
  params
    .filter(({ value }) => value !== undefined && value.length !== 0)
    .map(buildParam)
    .join('&');

const getListingParams = ({
  sort,
  page,
  limit,
  search,
  filters = [],
}: Listing): Array<Param> => {
  return [
    { name: 'page', value: page },
    { name: 'limit', value: limit },
    { name: 'sort_by', value: sort },
    {
      name: 'search',
      value: getSearchParam(search),
    },
    ...filters,
  ];
};

const buildEndpoint = ({ baseEndpoint, params }): string => {
  return `${baseEndpoint}?${buildParams(params)}`;
};

const buildListingEndpoint = ({
  baseEndpoint,
  options,
  filters,
}: BuildListingOptions): string => {
  return buildEndpoint({
    baseEndpoint,
    params: [...getListingParams({ ...options, filters })],
  });
};

export default buildListingEndpoint;
