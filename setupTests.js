/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

registerRequireContextHook();
