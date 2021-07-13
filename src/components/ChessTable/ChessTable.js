import styled from 'styled-components';
import _range from 'lodash/range';
import ChessTableItem from '../ChessTableItem/ChessTableItem';
import './ChessTable.scss';

const ChessTableStyled = styled.div`
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 1fr);
`;

const ChessTable = ({
  rows,
  cols,
  onItemClick,
  isAMovement,
  isCurrentPosition,
}) => {
  console.log(rows, cols);
  return (
    <ChessTableStyled
      className="ChessTable"
      rows={rows}
      cols={cols}
    >
      {_range(rows).map(row => {
        return _range(cols).map(col => {
          const key = `${row},${col}`;
          return <ChessTableItem
            key={key}
            row={row}
            col={col}
            onItemClick={onItemClick}
            isAMovement={isAMovement}
            isCurrentPosition={isCurrentPosition}
          />;
        });
      })}
    </ChessTableStyled>
  );
};

export default ChessTable;
