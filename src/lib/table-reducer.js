import {
  INITIAL_NUMBER_OF_COLS,
  INITIAL_NUMBER_OF_MOVEMENTS,
  INITIAL_NUMBER_OF_ROWS,
} from './constants';

export const initialChessTableState = {
  numberOfRows: INITIAL_NUMBER_OF_ROWS,
  numberOfCols: INITIAL_NUMBER_OF_COLS,
  numberOfMovements: INITIAL_NUMBER_OF_MOVEMENTS,
  movements: [],
};

export const chessTableActionTypes = {
  INC_ROWS: 'INC_ROWS',
  DEC_ROWS: 'DEC_ROWS',
  SET_ROWS: 'SET_ROWS',
  INC_COLS: 'INC_COLS',
  DEC_COLS: 'DEC_COLS',
  SET_COLS: 'SET_COLS',
  INC_NUM_MOVEMENTS: 'INC_NUM_MOVEMENTS',
  DEC_NUM_MOVEMENTS: 'DEC_NUM_MOVEMENTS',
  SET_NUM_MOVEMENTS: 'SET_NUM_MOVEMENTS',
  APPEND_MOVEMENT: 'APPEND_MOVEMENT',
  SET_MOVEMENTS: 'SET_MOVEMENTS',
};

export const chessTableReducer = (state, action) => {
  switch (action.type) {
  case chessTableActionTypes.INC_ROWS:
    return {
      ...state,
      numberOfRows: state.numberOfRows + 1,
    };
  case chessTableActionTypes.DEC_ROWS:
    return {
      ...state,
      numberOfRows: state.numberOfRows - 1,
    };
  case chessTableActionTypes.SET_ROWS:
    return {
      ...state,
      numberOfRows: action.payload,
    };
  case chessTableActionTypes.INC_COLS:
    return {
      ...state,
      numberOfCols: state.numberOfCols + 1,
    };
  case chessTableActionTypes.DEC_COLS:
    return {
      ...state,
      numberOfCols: state.numberOfCols - 1,
    };
  case chessTableActionTypes.SET_COLS:
    return {
      ...state,
      numberOfCols: action.payload,
    };
  case chessTableActionTypes.INC_NUM_MOVEMENTS:
    return {
      ...state,
      numberOfMovements: state.numberOfMovements + 1,
    };
  case chessTableActionTypes.DEC_NUM_MOVEMENTS:
    return {
      ...state,
      numberOfMovements: state.numberOfMovements - 1,
    };
  case chessTableActionTypes.SET_NUM_MOVEMENTS:
    return {
      ...state,
      numberOfMovements: action.payload,
    };
  case chessTableActionTypes.SET_MOVEMENTS:
    return {
      ...state,
      movements: [...action.payload],
    };
  case chessTableActionTypes.APPEND_MOVEMENT:
    return {
      ...state,
      movements: [...state.movements, { ...action.payload }],
    };
  default:
    return initialChessTableState;
  }
};
