export const processMovements = movements => {
  const result = [];
  for (let movement of movements) {
    result.push(`{${movement.row},${movement.col}}`);
  }
  return `[${result.join(', ')}]`;
};
