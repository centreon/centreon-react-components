import { isEmpty, isNil, reject, prop, head } from 'ramda';

import {
  SearchMatch,
  RegexSearch,
  SearchParam,
  Search,
  RegexSearchParam,
} from './models';

const getFoundFields = ({ value, fields }: RegexSearch): Array<SearchMatch> => {
  const fieldMatches = fields.map((field) => {
    const pattern = `${field.replace('.', '\\.')}:([^\\s]+)`;

    const [, valueMatch] = value?.match(pattern) || [];

    return { field, value: valueMatch };
  });

  return fieldMatches.filter(prop('value'));
};

const getRegexSearchParam = (
  regexSearch: RegexSearch | undefined,
): RegexSearchParam => {
  if (regexSearch === undefined) {
    return undefined;
  }

  const foundFields = getFoundFields(regexSearch);

  if (!isEmpty(foundFields)) {
    return {
      $and: foundFields.map(({ field, value }) => ({
        [field]: { $rg: `${value}` },
      })),
    };
  }

  const { value, fields } = regexSearch;

  return {
    $or: fields.map((field) => ({
      [field]: { $rg: `${value}` },
    })),
  };
};

const getListSearchesParam = (listSearches) => {
  if (listSearches === undefined) {
    return undefined;
  }

  return {
    $and: listSearches.map(({ field, values }) => ({
      [field]: { $in: values },
    })),
  };
};

const getSearchParam = (search: Search | undefined): SearchParam => {
  if (search === undefined) {
    return undefined;
  }

  const { regex, lists } = search;

  const regexSearchParam = getRegexSearchParam(regex);
  const listSearchesParam = getListSearchesParam(lists);

  const result = reject(isNil, [regexSearchParam, listSearchesParam]);

  if (result.length === 1) {
    return head(result);
  }

  return { $and: result };
};

export default getSearchParam;
