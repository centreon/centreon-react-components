import { QueryParameter } from '../../queryParameters/models';

export interface BuildListingEndpointParameters {
  baseEndpoint?: string;
  parameters: Parameters;
  customQueryParameters?: Array<QueryParameter>;
}

export interface SearchMatch {
  field: string;
  value: string;
}

export interface Parameters {
  sort?: SortQueryParameterValue;
  page?: number;
  limit?: number;
  search?: SearchParameter;
  customQueryParameters?: Array<QueryParameter>;
}

export interface SearchParameter {
  regex?: RegexSearchParameter;
  lists?: Array<ListsSearchParameter>;
}

export interface ListsSearchQueryParameterValue {
  $and: Array<{ [field: string]: { [field: string]: { $in: Array<string> } } }>;
}

export interface SortQueryParameterValue {
  [sortf: string]: string;
}

export interface RegexSearchParameter {
  value: string;
  fields: Array<string>;
}

export interface ListsSearchParameter {
  field: string;
  values: Array<string>;
}

type SearchPatterns = Array<{ [field: string]: { $rg: string } }>;

export interface OrSearchQueryParameterValue {
  $or: SearchPatterns;
}

export interface AndSearchQueryParameterValue {
  $and: SearchPatterns;
}

export type RegexSearchQueryParameterValue =
  | OrSearchQueryParameterValue
  | AndSearchQueryParameterValue
  | undefined;

export type SearchQueryParameterValue =
  | {
      $and: Array<
        RegexSearchQueryParameterValue | ListsSearchQueryParameterValue
      >;
    }
  | RegexSearchQueryParameterValue
  | ListsSearchQueryParameterValue
  | undefined;
