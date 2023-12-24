import { useMemo } from 'react';
import { ActionCreator, bindActionCreators as bind } from '@reduxjs/toolkit';
import { useAppDispatch } from '../use-app-dispatch';

type AC = ActionCreator<any>;
type Bound<A extends AC> = (...args: Parameters<A>) => void;

type UseActions = {
  <Fn extends AC>(actions: Fn): Bound<Fn>;
  // TODO: prevent passing non-const/non-tuple arrays
  <List extends readonly AC[]>(
    actions: List,
  ): {
    [Index in keyof List]: Bound<List[Index]>;
  };
  <Map extends Record<string, AC>>(
    actions: Map,
  ): {
    [Key in keyof Map]: Bound<Map[Key]>;
  };
};

export const useAppAction: UseActions = (actions: any) => {
  const dispatch = useAppDispatch();

  return useMemo(
    () =>
      Array.isArray(actions)
        ? actions.map((ac) => bind(ac, dispatch))
        : bind(actions, dispatch),
    [actions, dispatch],
  );
};
