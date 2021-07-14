import classNames from 'classnames';
import './ChessTableItem.scss';

const ChessTableItem = ({
  row,
  col,
  step,
  onItemClick,
  isAMovement,
  isCurrentPosition,
}) => {
  const itemClass = classNames({
    ChessTableItem: true,
    stepped: isAMovement(row, col),
    'current-position': isCurrentPosition(row, col),
    'is-black': (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0),
  });
  const itemText = step !== null ? step + 1 : '';
  return (
    <div
      className={itemClass}
      onClick={() => onItemClick(row, col)}
    >
      {itemText}
    </div>
  );
};

export default ChessTableItem;
