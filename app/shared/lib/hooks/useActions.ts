import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { historyActions } from '../../../pages/Analytics/lib/store/historySlice';
import { categoryActions } from '../../../pages/Chart/lib/store/categorySlice';
import { countActions } from '../../../pages/Count/lib/store/countSlice';
import { targetActions } from '../../../pages/Target/lib/store/targetSlice';

const allActions = {
  ...countActions,
  ...targetActions,
  ...categoryActions,
  ...historyActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
