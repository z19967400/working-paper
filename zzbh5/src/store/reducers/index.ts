import { combineReducers, ReducersMapObject, AnyAction, Reducer } from 'redux';
import CreateLetter, { AddState } from './CreateLetter';

// 合并reducers，模块化
export interface CombinedState {
  CreateLetter: AddState
}
const reducers: ReducersMapObject<CombinedState, AnyAction> = {
  CreateLetter
};
const reducer: Reducer<CombinedState, AnyAction> = combineReducers(reducers);

export default reducer;
