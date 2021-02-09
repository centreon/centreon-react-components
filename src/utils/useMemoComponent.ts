import * as React from 'react';

import { equals } from 'ramda';

const useDeepCompare = (value: React.DependencyList): Array<number> => {
  const ref = React.useRef<React.DependencyList>();
  const signalRef = React.useRef<number>(0);

  if (!equals(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }

  return [signalRef.current];
};

interface IUseMemoComponent {
  Component: React.ReactElement;
  memoProps: Array<unknown>;
}

const useMemoComponent = ({
  Component,
  memoProps,
}: IUseMemoComponent): JSX.Element =>
  React.useMemo(() => Component, useDeepCompare(memoProps));

export default useMemoComponent;
