import {
  QueryParameter,
  RegexSearchParameter,
  ListsSearchParameter,
  SortQueryParameterValue,
} from '../../queryParameters/models';

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
