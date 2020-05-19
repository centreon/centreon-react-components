import React from 'react';

import SearchInput from '.';
import SearchHelpTooltip from './SearchHelpTooltip';

export default { title: 'InputField/Search' };

export const normal = (): JSX.Element => <SearchInput />;

export const label = (): JSX.Element => <SearchInput label="Search" />;

const tooltipDescription = (
  <>
    <p>Here is how you can use this search input</p>
    <p>Just type something</p>
  </>
);

const tooltipExamples = [
  <li key="first">First example</li>,
  <li key="second">Second example</li>,
  <li key="third">Third example</li>,
];

const SearchTooltip = (): JSX.Element => (
  <SearchHelpTooltip
    onClose={(): void => undefined}
    description={tooltipDescription}
    examples={tooltipExamples}
    labelExamples="Here are some examples"
    labelSearchHelp="search input"
    labelTips="Tips"
    labelGetRegexHelp="This link should help you"
    urlTip="https://regex101.com"
    labelUrlTip="regex101.com"
  />
);

export const searchInputWithHelpTooltip = (): JSX.Element => (
  <SearchInput
    placeholder="Search"
    EndAdornment={(): JSX.Element => <SearchTooltip />}
  />
);
