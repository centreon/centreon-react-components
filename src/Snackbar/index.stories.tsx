import React from 'react';

import Snackbar from '.';

export default { title: 'Snackbar' };

export const errorSnackbar = (): JSX.Element => (
  <Snackbar open message="Something unexpected happened..." isError />
);

export const successSnackbar = (): JSX.Element => (
  <Snackbar open message="Something successful happened..." />
);
