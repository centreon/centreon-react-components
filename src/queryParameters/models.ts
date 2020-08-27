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

export type QueryParameterValue =
  | string
  | number
  | SortQueryParameterValue
  | SearchQueryParameterValue
  | Array<string>
  | undefined;

export interface QueryParameter {
  name: string;
  value: QueryParameterValue;
}
