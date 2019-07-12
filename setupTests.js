/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import emotionSerializer from 'jest-emotion';

expect.addSnapshotSerializer(emotionSerializer);

Enzyme.configure({ adapter: new Adapter() });
