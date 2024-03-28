import { BoardType, VoidCell } from '../blocks/BlockName';
import { dropHangingBlocks } from './blockPhysics';

type Coordinates = {
  row: number;
  col: number;
};

const getFullLines = (board: BoardType) => {
  const c = structuredClone(board);

  const rows = c.length;
  const cols = c[0].length;

  let startRow = board.length - 1;

  const trace = new Array(rows)
    .fill(false)
    .map(() => new Array(cols).fill(false));
  const fullLines = [];

  while (startRow >= 0) {
    if (c[startRow][0] === undefined || c[startRow][0] === VoidCell.VOID) break;
    if (trace[startRow][0]) {
      startRow -= 1;
      continue;
    }

    let hasLeftEdge = false;
    let hasRightEdge = false;

    const current = c[startRow][0];

    const depthSearch = (
      row: number,
      col: number,
      line: Array<Coordinates>
    ) => {
      if (row < 0 || row >= rows || col < 0 || col >= cols || trace[row][col])
        return;

      if (col === 0) hasLeftEdge = true;
      if (col === c[0].length - 1) hasRightEdge = true;

      if (c[row][col] === current) {
        trace[row][col] = true;
        line.push({ row, col });

        depthSearch(row - 1, col, line);
        depthSearch(row + 1, col, line);
        depthSearch(row, col - 1, line);
        depthSearch(row, col + 1, line);
      }
    };

    const line = new Array<Coordinates>();
    depthSearch(startRow, 0, line);

    if (hasLeftEdge && hasRightEdge) {
      fullLines.push(line);
    }

    hasLeftEdge = false;
    hasRightEdge = false;

    startRow -= 1;
  }

  return fullLines;
};

const removeFullPaths = (board: BoardType, paths: Array<Coordinates[]>) => {
  const clone = structuredClone(board);
  for (const path of paths) {
    for (const node of path) {
      clone[node.row][node.col] = VoidCell.VOID;
    }
  }

  return clone;
};

export const checkPowdris = (board: BoardType): [BoardType, number[]] => {
  const clone = structuredClone(board);

  const lines = getFullLines(clone);
  const boardWithoutPaths = removeFullPaths(clone, lines);
  const boardWithDroppedBlocks = dropHangingBlocks(boardWithoutPaths);

  const lengths = lines.map((l) => l.length);

  return [boardWithDroppedBlocks, lengths];
};
