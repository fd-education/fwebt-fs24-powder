import { BlockType, BoardType, VoidCell } from '../domain/blocks/BlockName';
import { BlockShape } from '../domain/blocks/BlockShapes';

export const useGamePhysics = () => {
  const checkCollisions = (
    board: BoardType,
    shape: BlockShape,
    shapeRow: number,
    shapeCol: number
  ): boolean => {
    let hasCollision = false;
    shape
      .filter((row: boolean[]) => row.some((hasBlock) => hasBlock))
      .forEach((row: boolean[], ri: number) => {
        row.forEach((hasBlock: boolean, ci: number) => {
          if (
            hasBlock &&
            // bottom board edge collision
            (shapeRow + ri >= board.length ||
              // right board edge collision
              shapeCol + ci >= board[0].length ||
              // left board edge collision
              shapeCol + ci < 0 ||
              // block collision
              board[shapeRow + ri][shapeCol + ci] !== VoidCell.VOID)
          ) {
            hasCollision = true;
          }
        });
      });

    return hasCollision;
  };

  const dropHangingBlocks = (board: BoardType) => {
    const clone = structuredClone(board);

    for (let i = clone[0].length - 1; i >= 0; i--) {
      let lowestVoid = -1;

      for (let j = clone.length - 1; j >= 0; j--) {
        const current = clone[j][i];
        if (current === VoidCell.VOID && j > lowestVoid) {
          lowestVoid = j;
        } else if (current !== VoidCell.VOID && lowestVoid !== -1) {
          clone[lowestVoid][i] = current;
          clone[j][i] = VoidCell.VOID;
          lowestVoid--;
        }
      }
    }

    return clone;
  };

  const desintegrateBlocks = (board: BoardType) => {
    enum sides {
      LEFT,
      RIGHT,
    }

    const isBlocked = (e: BlockType) => {
      return e === undefined || e !== VoidCell.VOID;
    };

    const isVoid = (e: BlockType) => {
      return e === VoidCell.VOID;
    }

    const clone = dropHangingBlocks(board);
    for (let c = 0; c < clone[0].length; c++) {
      for (let r = 0; r < clone.length - 2; r++) {
        if (
          isVoid(clone[r][c]) || // current is empty
          (isBlocked(clone[r][c - 1]) && isBlocked(clone[r][c + 1])) || // neighbours are empty
          (isBlocked(clone[r + 1][c - 1]) && isBlocked(clone[r + 1][c - 1])) // bottom row neighbours are empty
        )
          continue;

        let leftHeight = 0;
        let rightHeight = 0;
        let i = 1;
        do {
          leftHeight += isVoid(clone[r + i][c - 1]) ? 1 : 0;
          rightHeight += isVoid(clone[r + i][c + 1]) ? 1 : 0;
          i++;
        } while (i + r < board.length);

        const current = clone[r][c];
        clone[r][c] = VoidCell.VOID;
        if (
          leftHeight === rightHeight &&
          c !== clone[0].length - 1 &&
          c !== 1
        ) {
          if (Math.floor(Math.random() * 2) === sides.LEFT) {
            clone[r + leftHeight][c - 1] = current;
          } else {
            clone[r + rightHeight][c + 1] = current;
          }
        } else if (c === clone[0].length - 1 || leftHeight > rightHeight) {
          clone[r + leftHeight][c - 1] = current;
        } else if (c === 0 || leftHeight < rightHeight) {
          clone[r + rightHeight][c + 1] = current;
        }
      }
    }

    return clone;
  };

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
      if (
        c[startRow][0] === undefined ||
        c[startRow][0] === VoidCell.VOID
      )
        break;
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

  const checkPowdris = (board: BoardType): [BoardType, number[]] => {
    const clone = structuredClone(board);

    const lines = getFullLines(clone);
    const boardWithoutPaths = removeFullPaths(clone, lines);
    const boardWithDroppedBlocks = dropHangingBlocks(boardWithoutPaths);

    const lengths = lines.map((l) => l.length);

    return [boardWithDroppedBlocks, lengths];
  };

  return {
    checkCollisions,
    dropHangingBlocks,
    desintegrateBlocks,
    checkPowdris,
  };
};
