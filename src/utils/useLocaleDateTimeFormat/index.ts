import dayjs from 'dayjs';
import humanizeDuration from 'humanize-duration';

import 'dayjs/plugin/timezone';

import { useUserContext } from '@centreon/ui-context';

interface FormatParameters {
  date: Date | string;
  formatString: string;
}

interface HumanizeDuration {
  duration: number;
  labelConjunction: string;
}

export interface LocaleDateTimeFormat {
  format: (dateFormat: FormatParameters) => string;
  toDate: (date: Date | string) => string;
  toDateTime: (date: Date | string) => string;
  toTime: (date: Date | string) => string;
  toIsoString: (date: Date) => string;
  toHumanizedDuration: ({
    duration,
    labelConjunction,
  }: HumanizeDuration) => string;
}

const dateTimeFormat = 'L HH:mm';
const dateFormat = 'L';
const timeFormat = 'HH:mm';

const useLocaleDateTimeFormat = (): LocaleDateTimeFormat => {
  const { locale, timezone } = useUserContext();

  const format = ({ date, formatString }: FormatParameters): string => {
    const normalizedLocale = locale.replace('_', '-').toLowerCase();

    return dayjs(date)
      .tz(timezone)
      .locale(normalizedLocale)
      .format(formatString);
  };

  const toDateTime = (date: Date | string): string => {
    return format({
      date,
      formatString: dateTimeFormat,
    });
  };

  const toDate = (date: Date | string): string => {
    return format({
      date,
      formatString: dateFormat,
    });
  };

  const toTime = (date: Date | string): string => {
    return format({
      date,
      formatString: timeFormat,
    });
  };

  const toIsoString = (date: Date): string => {
    return `${new Date(date).toISOString().substring(0, 19)}Z`;
  };

  const toHumanizedDuration = ({
    duration,
    labelConjunction,
  }: HumanizeDuration): string => {
    const normalizedLocale = locale.substring(0, 2).toLowerCase();

    return humanizeDuration(duration * 1000, {
      round: true,
      language: normalizedLocale,
      conjunction: ` ${labelConjunction} `,
      serialComma: false,
      fallbacks: ['en'],
    });
  };

  return {
    format,
    toDateTime,
    toDate,
    toTime,
    toIsoString,
    toHumanizedDuration,
  };
};

export default useLocaleDateTimeFormat;
export { dateTimeFormat, dateFormat, timeFormat };
