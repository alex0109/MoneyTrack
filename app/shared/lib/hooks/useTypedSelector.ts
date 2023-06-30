import { useSelector } from 'react-redux';

import type { TypeRootState } from '../store/store';
import type { TypedUseSelectorHook } from 'react-redux';

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector;
