import * as React from 'react';

import { equals, map, nth, toPairs } from 'ramda';

const useDeepCompare = (value: React.DependencyList): Array<number> => {
  const ref = React.useRef<React.DependencyList>();
  const signalRef = React.useRef<number>(0);

  if (!equals(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }

  return [signalRef.current];
};

export const toList = (object: Record<string, unknown>): Array<unknown> =>
  map(nth(1), toPairs(object));

export default useDeepCompare;
