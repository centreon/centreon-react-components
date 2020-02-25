import { useContext } from 'react';
import { SnackbarContext, SnackbarState } from './withSnackbar';

const useSnackbar = (): SnackbarState => {
  return useContext(SnackbarContext);
};

export default useSnackbar;
