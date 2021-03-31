import * as React from 'react';

import {
  remove,
  move,
  equals,
  pipe,
  type,
  last,
  length,
  inc,
  path,
  F,
} from 'ramda';

import { makeStyles } from '@material-ui/core';

import { SelectEntry } from '../..';
import { ConnectedAutoCompleteFieldProps } from '../Connected';
import { Props as SingleAutocompletefieldProps } from '..';

import SortableList from './SortableList';

interface Props {
  initialValues?: Array<SelectEntry>;
  onSelectedValuesChange?: (values: Array<SelectEntry>) => Array<SelectEntry>;
}

const useStyles = makeStyles((theme) => ({
  helper: {
    boxShadow: theme.shadows[3],
    zIndex: theme.zIndex.tooltip,
  },
}));

const DraggableAutocomplete = (
  MultiAutocomplete: (props) => JSX.Element,
): ((props) => JSX.Element) => {
  const InnerDraggableAutocompleteField = ({
    onSelectedValuesChange,
    initialValues,
    ...props
  }: Props &
    (ConnectedAutoCompleteFieldProps | SingleAutocompletefieldProps)) => {
    const [selectedValues, setSelectedValues] = React.useState<
      Array<SelectEntry>
    >(initialValues || []);
    const [isSorting, setIsSorting] = React.useState(false);

    const classes = useStyles();

    const onDragEnd = ({ oldIndex, newIndex }) => {
      setSelectedValues(move(oldIndex, newIndex, selectedValues));
      setIsSorting(false);
    };

    const onDragStart = () => setIsSorting(true);

    const deleteValue = (index) => {
      setSelectedValues(remove(index, 1, selectedValues));
    };

    const onChange = (event, newValue) => {
      const lastValue = last(newValue);
      if (pipe(type, equals('String'))(lastValue)) {
        setSelectedValues([
          ...selectedValues,
          {
            createOption: lastValue,
            id: inc(length(selectedValues)),
            name: lastValue,
          },
        ]);
        return;
      }
      setSelectedValues(newValue);
    };

    const cancelStart = (event) =>
      pipe(
        path(['target', 'textContent']) as (object) => string,
        equals(''),
      )(event);

    const renderTags = () => {
      return (
        <SortableList
          axis="xy"
          deleteValue={deleteValue}
          helperClass={classes.helper}
          isSorting={isSorting}
          items={selectedValues}
          shouldCancelStart={cancelStart}
          onSortEnd={onDragEnd}
          onSortStart={onDragStart}
        />
      );
    };

    React.useEffect(() => {
      onSelectedValuesChange?.(selectedValues);
    }, [selectedValues]);

    return (
      <MultiAutocomplete
        clearOnBlur
        freeSolo
        handleHomeEndKeys
        selectOnFocus
        disableCloseOnSelect={false}
        displayCheckboxOption={false}
        getOptionSelected={F}
        renderTags={renderTags}
        value={selectedValues}
        onChange={onChange}
        {...props}
      />
    );
  };

  return InnerDraggableAutocompleteField;
};

export default DraggableAutocomplete;
