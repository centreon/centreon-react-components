import * as React from 'react';

import { concat, last, equals } from 'ramda';
import { useDebouncedCallback } from 'use-debounce';

import { Typography, Checkbox, makeStyles } from '@material-ui/core';

import { Props as AutocompleteFieldProps } from '..';
import { SelectEntry } from '../..';
import useRequest from '../../../../api/useRequest';
import { getData } from '../../../../api';
import useObserver from '../../../../utils/useObserver';

interface Props {
  getEndpoint: ({ search, page }) => string;
  getOptionsFromResult: (result) => Array<SelectEntry>;
  initialPage: number;
}

interface TestProps<TData> {
  result: Array<TData>;
  meta;
}

const useStyles = makeStyles((theme) => ({
  checkbox: {
    padding: 0,
    marginRight: theme.spacing(1),
  },
}));

export default (
  AutocompleteField: (props) => JSX.Element,
  multiple: boolean,
): ((props) => JSX.Element) => {
  const InfiniteScroll = <TData extends Record<string, unknown>>({
    initialPage,
    getEndpoint,
    getOptionsFromResult,
    ...props
  }: Props & Omit<AutocompleteFieldProps, 'options'>): JSX.Element => {
    const [options, setOptions] = React.useState<Array<SelectEntry>>();
    const [optionsOpen, setOptionsOpen] = React.useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState<string>('');
    const [page, setPage] = React.useState(1);
    const [maxPage, setMaxPage] = React.useState(initialPage);
    const classes = useStyles();

    const { sendRequest, sending } = useRequest<TestProps<TData>>({
      request: getData,
    });

    const loadOptions = ({ endpoint, loadMore = false }) => {
      sendRequest(endpoint).then(({ result, meta }) => {
        setOptions(
          concat(loadMore ? options : [], getOptionsFromResult(result)),
        );
        setMaxPage(Math.ceil(meta.pagination.total / meta.pagination.limit));
      });
    };

    const lastItemElementRef = useObserver({
      maxPage,
      page,
      loading: sending,
      action: () => setPage(page + 1),
    });

    const [debouncedChangeText] = useDebouncedCallback((value: string) => {
      if (page === initialPage) {
        loadOptions({
          endpoint: getEndpoint({ search: value, page: initialPage }),
        });
      }
      setPage(1);
    }, 500);

    const changeText = (event): void => {
      debouncedChangeText(event.target.value);
      setSearchValue(event.target.value);
    };

    const openOptions = (): void => {
      setOptionsOpen(true);
    };

    const closeOptions = (): void => {
      setOptionsOpen(false);
    };

    React.useEffect(() => {
      if (!optionsOpen) {
        setSearchValue('');
        setOptions([]);
        setPage(1);
        return;
      }

      if (optionsOpen) {
        loadOptions({
          endpoint: getEndpoint({ search: searchValue, page }),
          loadMore: page > 1,
        });
      } else if (!optionsOpen) {
        setOptions([]);
        setPage(initialPage);
      }
    }, [optionsOpen, page]);

    const loading = sending || !options;

    return (
      <AutocompleteField
        onOpen={openOptions}
        onClose={closeOptions}
        options={options || []}
        onTextChange={changeText}
        loading={loading}
        renderOption={(option, { selected }): JSX.Element => {
          const typographyProps = equals(last(options), option)
            ? { ref: lastItemElementRef }
            : {};
          const checkBox = multiple && (
            <Checkbox
              color="primary"
              checked={selected}
              className={classes.checkbox}
            />
          );
          return (
            <>
              {checkBox}
              <Typography {...typographyProps}>{option.name}</Typography>
            </>
          );
        }}
        filterOptions={(opt) => opt}
        {...props}
      />
    );
  };

  return InfiniteScroll;
};
