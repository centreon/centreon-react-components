const toRawQueryParameter = ({ name, value }): string => {
  return `${name}=${JSON.stringify(value)}`;
};

const toRawQueryParameters = (queryParameters): Array<string> =>
  queryParameters
    .filter(({ value }) => value !== undefined && value.length !== 0)
    .map(toRawQueryParameter)
    .join('&');

export default toRawQueryParameters;
