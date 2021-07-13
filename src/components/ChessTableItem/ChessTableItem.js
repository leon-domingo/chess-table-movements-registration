import classNames from 'classnames';
import './ChessTableItem.scss';

const ChessTableItem = ({
  row,
  col,
  onItemClick,
  isAMovement,
  isCurrentPosition,
}) => {
  const itemClass = classNames({
    ChessTableItem: true,
    stepped: isAMovement(row, col),
    'current-position': isCurrentPosition(row, col),
  });
  const itemText = `${row}, ${col}`;
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
