import buildListingEndpoint from '.';

describe(buildListingEndpoint, () => {
  const baseEndpoint = 'resources';
  const options = {
    page: 1,
    limit: 10,
    sort: { name: 'asc' },
  };
  it('builds the listing endpoint string using the given params', () => {
    const endpoint = buildListingEndpoint({ baseEndpoint, options });

    expect(endpoint).toEqual(
      'resources?page=1&limit=10&sort_by={"name":"asc"}',
    );
  });

  it('builds the listing endpoint string with a "$and" search expression between search options when search option patterns are found in the search input', () => {
    const endpoint = buildListingEndpoint({
      baseEndpoint,
      options: {
        ...options,
        search: {
          regex: {
            value: 'h.name:hvalue',
            fields: ['h.name'],
          },
        },
      },
    });

    expect(endpoint).toContain(
      '&search={"$and":[{"h.name":{"$rg":"hvalue"}}]}',
    );
  });

  it('builds the listing endpoint string with a "$or" search expression between search options when search option patterns are not found in the search input', () => {
    const endpoint = buildListingEndpoint({
      baseEndpoint,
      options: {
        ...options,
        search: {
          regex: {
            value: 'searchValue',
            fields: ['h.name', 's.description'],
          },
        },
      },
    });

    expect(endpoint).toContain(
      '&search={"$or":[{"h.name":{"$rg":"searchValue"}},{"s.description":{"$rg":"searchValue"}}]}',
    );
  });

  it('builds the listing endpoint string with a "$and" search expression between list search options', () => {
    const endpoint = buildListingEndpoint({
      baseEndpoint,
      options: {
        ...options,
        search: {
          lists: [
            {
              field: 'h.status',
              values: ['OK'],
            },
          ],
        },
      },
    });

    expect(endpoint).toContain(
      '&search={"$and":[{"h.status":{"$in":["OK"]}}]}',
    );
  });
});
