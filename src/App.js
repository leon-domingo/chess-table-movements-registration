import { useState, useReducer, useEffect } from 'react';
import {
  ARROW_KEYS,
  MIN_NUMBER_OF_ROWS,
  MIN_NUMBER_OF_COLS,
  NULL_POSITION,
  STEP,
} from './lib/constants';
import { processMovements } from './lib/utils';
import ChessTable from './components/ChessTable/ChessTable';
import InputSelector from './components/InputSelector/InputSelector';
import {
  chessTableReducer,
  initialChessTableState,
  chessTableActionTypes,
} from './lib/table-reducer';
import './App.scss';

function App() {
  const [tableState, tableDispatch] = useReducer(chessTableReducer, initialChessTableState);
  const [currentPosition, setCurrentPosition] = useState({ ...NULL_POSITION });
  const [isPathVisible, setIsPathVisible] = useState(false);

  const isCurrentPositionNullPosition = () => (
    currentPosition.row === NULL_POSITION.row &&
    currentPosition.col === NULL_POSITION.col
  );

  const isEndOfMovements = () => tableState.movements.length === tableState.numberOfMovements;

  const isStartState = () => (
    isCurrentPositionNullPosition() ||
    isEndOfMovements()
  );

  const isPathInProgress = () => (
    !isCurrentPositionNullPosition() &&
    !isEndOfMovements()
  );

  const handleClickIncreaseMovements = () => {
    tableDispatch({ type: chessTableActionTypes.INC_NUM_MOVEMENTS });
    setIsPathVisible(false);
  };

  const handleClickDecreaseMovements = () => {
    if (tableState.numberOfMovements > 2) {
      tableDispatch({ type: chessTableActionTypes.DEC_NUM_MOVEMENTS });
      setIsPathVisible(false);
    }
  };

  const handleClickIncreaseRows = () => {
    tableDispatch({ type: chessTableActionTypes.INC_ROWS });
    setIsPathVisible(false);
  };

  const handleClickDecreaseRows = () => {
    if (tableState.numberOfRows > 2) {
      tableDispatch({ type: chessTableActionTypes.DEC_ROWS });
      setIsPathVisible(false);
    }
  };

  const handleClickIncreaseCols = () => {
    tableDispatch({ type: chessTableActionTypes.INC_COLS });
    setIsPathVisible(false);
  };

  const handleClickDecreaseCols = () => {
    if (tableState.numberOfCols > 2) {
      tableDispatch({ type: chessTableActionTypes.DEC_COLS });
      setIsPathVisible(false);
    }
  };

  const handleChessTableItemClick = (row, col) => {
    const initialPosition = { row, col };
    setCurrentPosition({ ...initialPosition });
    tableDispatch({
      type: chessTableActionTypes.SET_MOVEMENTS,
      payload: [{ ...initialPosition }],
    });
    setIsPathVisible(false);
  };

  useEffect(() => {
    const appendMovement = ({ row, col }) => {
      const movementsLength = tableState.movements.length;
      tableDispatch({
        type: chessTableActionTypes.APPEND_MOVEMENT,
        payload: { row, col },
      });
      setIsPathVisible(movementsLength === tableState.numberOfMovements - 1);
    };

    const handleKeyDown = event => {
      if (tableState.movements.length === tableState.numberOfMovements) {
        return;
      }

      const keyCode = event.keyCode;
      const { row, col } = currentPosition;
      let newPosition;
      if (keyCode === ARROW_KEYS.LEFT) {
        if (col > 0) {
          newPosition = {
            row,
            col: col - STEP,
          };
        }
      } else if (keyCode === ARROW_KEYS.UP) {
        if (row > 0) {
          newPosition = {
            row: row - STEP,
            col,
          };
        }
      } else if (keyCode === ARROW_KEYS.RIGHT) {
        if (col < tableState.numberOfCols - 1) {
          newPosition = {
            row,
            col: col + 1,
          };
        }
      } else if (keyCode === ARROW_KEYS.DOWN) {
        if (row < tableState.numberOfRows - 1) {
          newPosition = {
            row: row + 1,
            col,
          };
        }
      }

      if (newPosition) {
        setCurrentPosition({ ...newPosition });
        appendMovement({ ...newPosition });
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    tableState,
    currentPosition,
    setCurrentPosition,
  ]);

  return (
    <div className="App">
      <header className="App__header">
        <InputSelector
          inputId="numberOfRowsSelector"
          labelText="# of rows"
          value={tableState.numberOfRows}
          minValue={MIN_NUMBER_OF_ROWS}
          changeValue={(rows) => tableDispatch({
            type: chessTableActionTypes.SET_ROWS,
            payload: +rows,
          })}
          onClickIncrease={handleClickIncreaseRows}
          onClickDecrease={handleClickDecreaseRows}
        />
        <InputSelector
          inputId="numberOfColsSelector"
          labelText="# of cols"
          value={tableState.numberOfCols}
          minValue={MIN_NUMBER_OF_COLS}
          changeValue={(cols) => tableDispatch({
            type: chessTableActionTypes.SET_COLS,
            payload: +cols,
          })}
          onClickIncrease={handleClickIncreaseCols}
          onClickDecrease={handleClickDecreaseCols}
        />
        <InputSelector
          inputId="numberOfMovementsSelector"
          labelText="# of movements"
          value={tableState.numberOfMovements}
          minValue={2}
          changeValue={(noOfMovements) => tableDispatch({
            type: chessTableActionTypes.SET_NUM_MOVEMENTS,
            payload: +noOfMovements,
          })}
          onClickIncrease={handleClickIncreaseMovements}
          onClickDecrease={handleClickDecreaseMovements}
        />
      </header>

      <main className="App__content">
        <ChessTable
          rows={tableState.numberOfRows}
          cols={tableState.numberOfCols}
          onItemClick={handleChessTableItemClick}
          movements={tableState.movements}
          currentPosition={currentPosition}
        />
      </main>

      <footer className="App__footer">
        {
          isPathVisible &&
          <div className="App__footer__movements-list">
            {processMovements(tableState.movements)}
          </div>
        }
        {
          isPathInProgress() &&
          <div className="App__footer__start">
            {`${tableState.numberOfMovements - tableState.movements.length} movements left`}
          </div>
        }
        {
          isStartState() &&
          <div className="App__footer__start">Click on a cell to start!</div>
        }
      </footer>
    </div>
  );
}

export default App;
