import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { authSlice, AppDispatch, setTheme } from 'src/store';

export const UseActions = () => {
  const AllActions = {
    ...authSlice.actions,
    setTheme,
  };

  const dispatch = useDispatch<AppDispatch>();

  return bindActionCreators(AllActions, dispatch);
};
