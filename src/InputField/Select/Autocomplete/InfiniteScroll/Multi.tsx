import InfiniteScrollAutocompleteField from '.';
import MultiAutocompleteField from '../Multi';

const MultiInfiniteScrollAutocompleteField = InfiniteScrollAutocompleteField(
  MultiAutocompleteField,
  true,
);

export default MultiInfiniteScrollAutocompleteField;
