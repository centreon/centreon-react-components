import dayjs from 'dayjs';

import 'dayjs/locale/en';

import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
import localizedFormatPlugin from 'dayjs/plugin/localizedFormat';

import useLocaleDateTimeFormat, { LocaleDateTimeFormat } from '.';

dayjs.extend(timezonePlugin);
dayjs.extend(utcPlugin);
dayjs.extend(localizedFormatPlugin);

jest.mock('@centreon/ui-context', () => ({
  useUserContext: jest.fn().mockImplementation(() => ({
    locale: 'unsupported_locale',
    timezone: 'Europe/Paris',
  })),
}));

const renderUseLocaleDateTimeFormat = (): RenderHookResult<
  unknown,
  LocaleDateTimeFormat
> => {
  return renderHook(() => useLocaleDateTimeFormat());
};

describe(useLocaleDateTimeFormat, () => {
  describe('toHumanizedDuration', () => {
    it('formats the given duration in English to a humanized duration when the locale is unsupported', () => {
      const { result } = renderUseLocaleDateTimeFormat();

      const formattedDateTime = result.current.toHumanizedDuration({
        duration: 22141,
        labelConjunction: 'and',
      });

      expect(formattedDateTime).toEqual('6 hours, 9 minutes and 1 second');
    });
  });
});
