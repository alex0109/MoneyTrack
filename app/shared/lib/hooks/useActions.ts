import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { categoryActions } from '../../../pages/Chart/lib/store/categorySlice';
import { countActions } from '../../../pages/Count/lib/store/countSlice';
import { targetActions } from '../../../pages/Target/lib/store/targetSlice';

const allActions = {
  ...countActions,
  ...targetActions,
  ...categoryActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
