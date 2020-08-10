export interface BuildListingOptions {
  baseEndpoint?: string;
  options: Listing;
  filters?: Array<Filter>;
}

interface Sort {
  [sortf: string]: string;
}

export interface RegexSearch {
  value?: string;
  fields: Array<string>;
}

export interface ListSearch {
  field: string;
  values: Array<string>;
}

export interface SearchMatch {
  field: string;
  value: string;
}

export interface Filter {
  name: string;
  value: Array<string> | string;
}

export interface Listing {
  sort?: Sort;
  page?: number;
  limit?: number;
  search?: Search;
  filters?: Array<Filter>;
}

type SearchPatterns = Array<{ [field: string]: { $rg: string } }>;

export interface OrSearchParam {
  $or: SearchPatterns;
}

export interface AndSearchParam {
  $and: SearchPatterns;
}

export type RegexSearchParam = OrSearchParam | AndSearchParam | undefined;

export interface Search {
  regex?: RegexSearch;
  lists?: Array<ListSearch>;
}

export interface ListSearchesParam {
  $and: Array<{ [field: string]: { [field: string]: { $in: Array<string> } } }>;
}

export type SearchParam =
  | {
      $and: Array<RegexSearchParam | ListSearchesParam>;
    }
  | RegexSearchParam
  | ListSearchesParam
  | undefined;

export type Value =
  | string
  | number
  | Sort
  | SearchParam
  | Array<string>
  | undefined;

export interface Param {
  name: string;
  value: Value;
}
