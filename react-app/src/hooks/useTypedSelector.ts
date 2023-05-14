import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/reducers';
import {AppDispatch} from '../portal-react-angular-react-app';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;
