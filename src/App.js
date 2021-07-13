import { useState, useEffect } from 'react';
import styled from 'styled-components';
import _range from 'lodash/range';
import classNames from 'classnames';
import {
  ARROW_KEYS,
  INITIAL_NUMBER_OF_ROWS,
  INITIAL_NUMBER_OF_COLS,
  INITIAL_NUMBER_OF_MOVEMENTS,
  NULL_POSITION,
  STEP,
} from './lib/constants';
import './App.scss';
import { processMovements } from './lib/utils';

const ChessTable = styled.div`
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 1fr);
`;

function App() {
  const [numberOfRows, setNumberOfRows] = useState(INITIAL_NUMBER_OF_ROWS);
  const [numberOfCols, setNumberOfCols] = useState(INITIAL_NUMBER_OF_COLS);
  const [numberOfMovements, setNumberOfMovements] = useState(INITIAL_NUMBER_OF_MOVEMENTS);
  const [movements, setMovements] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ ...NULL_POSITION });
  const [isPathVisible, setIsPathVisible] = useState(false);

  const isStartState = () => (
    (
      currentPosition.row === NULL_POSITION.row &&
      currentPosition.col === NULL_POSITION.col
    ) || movements.length === numberOfMovements
  );

  const isPathInProgress = () => !(
    currentPosition.row === NULL_POSITION.row &&
    currentPosition.col === NULL_POSITION.col
  ) && (movements.length < numberOfMovements);

  const isCurrentPosition = (row, col) => (
    currentPosition.row === row &&
    currentPosition.col === col
  );

  const isAMovement = (row, col) => {
    return !!movements.find(movement => movement.row === row && movement.col === col);
  };

  const handleClickIncreaseMovements = () => {
    setNumberOfMovements(numberOfMovements + 1);
    setIsPathVisible(false);
  };

  const handleClickDecreaseMovements = () => {
    if (numberOfMovements > 1) {
      setNumberOfMovements(numberOfMovements - 1);
      setIsPathVisible(false);
    }
  };

  const handleClickIncreaseRows = () => {
    setNumberOfRows(numberOfRows + 1);
    setIsPathVisible(false);
  };

  const handleClickDecreaseRows = () => {
    if (numberOfRows > 1) {
      setNumberOfRows(numberOfRows - 1);
      setIsPathVisible(false);
    }
  };

  const handleClickIncreaseCols = () => {
    setNumberOfCols(numberOfCols + 1);
    setIsPathVisible(false);
  };

  const handleClickDecreaseCols = () => {
    if (numberOfCols > 1) {
      setNumberOfCols(numberOfCols - 1);
      setIsPathVisible(false);
    }
  };

  const handleChessTableItemClick = (row, col) => {
    const initialPosition = { row, col };
    setCurrentPosition({ ...initialPosition });
    setMovements([{ ...initialPosition }]);
    setIsPathVisible(false);
  };

  useEffect(() => {
    const appendMovement = ({ row, col }) => {
      const movementsLength = movements.length;
      setMovements([...movements, { row, col }]);
      setIsPathVisible(movementsLength === numberOfMovements - 1);
    };

    const handleKeyDown = event => {
      if (movements.length === numberOfMovements) {
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
        if (col < numberOfCols - 1) {
          newPosition = {
            row,
            col: col + 1,
          };
        }
      } else if (keyCode === ARROW_KEYS.DOWN) {
        if (row < numberOfRows - 1) {
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
    movements,
    currentPosition,
    setCurrentPosition,
    numberOfCols,
    numberOfRows,
    numberOfMovements,
  ]);

  return (
    <div className="App">
      <header className="App__header">
        <div className="App__input">
          <label htmlFor="numberOfRows"># of rows</label>
          <input
            id="numberOfRows"
            type="number"
            min="1"
            step="1"
            value={numberOfRows}
            onChange={(e) => setNumberOfRows(e.target.value)}
          />
          <div className="App__input__buttons">
            <button
              className="App__input__buttons__button"
              onClick={handleClickIncreaseRows}
            >
              <i className="fas fa-angle-up" />
            </button>

            <button
              className="App__input__buttons__button"
              onClick={handleClickDecreaseRows}
            >
              <i className="fas fa-angle-down" />
            </button>
          </div>
        </div>

        <div className="App__input">
          <label htmlFor="numberOfCols"># of cols</label>
          <input
            id="numberOfCols"
            type="number"
            min="1"
            step="1"
            value={numberOfCols}
            onChange={(e) => setNumberOfCols(e.target.value)}
          />
          <div className="App__input__buttons">
            <button
              className="App__input__buttons__button"
              onClick={handleClickIncreaseCols}
            >
              <i className="fas fa-angle-up" />
            </button>

            <button
              className="App__input__buttons__button"
              onClick={handleClickDecreaseCols}
            >
              <i className="fas fa-angle-down" />
            </button>
          </div>
        </div>

        <div className="App__input">
          <label htmlFor="numberOfMovements"># of movements</label>
          <input
            id="numberOfMovements"
            type="number"
            min="1"
            step="1"
            value={numberOfMovements}
            onChange={(e) => setNumberOfMovements(e.target.value)}
          />
          <div className="App__input__buttons">
            <button
              className="App__input__buttons__button"
              onClick={handleClickIncreaseMovements}
            >
              <i className="fas fa-angle-up" />
            </button>

            <button
              className="App__input__buttons__button"
              onClick={handleClickDecreaseMovements}
            >
              <i className="fas fa-angle-down" />
            </button>
          </div>
        </div>
      </header>

      <main className="App__content">
        <ChessTable
          className="ChessTable"
          rows={numberOfRows}
          cols={numberOfCols}
        >
          {_range(numberOfRows).map(row => {
            return _range(numberOfCols).map(col => {
              const key = `${row},${col}`;
              const itemClass = classNames({
                ChessTable__item: true,
                stepped: isAMovement(row, col),
                'current-position': isCurrentPosition(row, col),
              });
              const itemText = `${row}, ${col}`;
              return (
                <div
                  className={itemClass}
                  key={key}
                  onClick={() => handleChessTableItemClick(row, col)}
                >
                  {itemText}
                </div>
              );
            });
          })}
        </ChessTable>
      </main>
      <footer className="App__footer">
        {
          isPathVisible &&
          <div className="App__footer__movements-list">
            {processMovements(movements)}
          </div>
        }
        {
          isPathInProgress() &&
          <div className="App__footer__start">
            {`${numberOfMovements - movements.length} movements left`}
          </div>
        }
        {isStartState() && <div className="App__footer__start">Click on a cell to start!</div>}
      </footer>
    </div>
  );
}

export default App;
