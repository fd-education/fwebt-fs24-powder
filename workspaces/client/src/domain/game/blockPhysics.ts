import { BoardType, VoidCell, BlockType } from '../blocks/BlockName';
import { BlockShape } from '../blocks/BlockShapes';

enum sides {
  LEFT,
  RIGHT,
}

const isBlocked = (e: BlockType): boolean => {
  return e === undefined || e !== VoidCell.VOID;
};

const isVoid = (e: BlockType): boolean => {
  return e === VoidCell.VOID;
};

export const checkCollisions = (
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

export const dropHangingBlocks = (board: BoardType): BoardType => {
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

export const desintegrateBlocks = (board: BoardType): BoardType => {
  const clone = dropHangingBlocks(board);
  for (let c = 0; c < clone[0].length; c++) {
    for (let r = 0; r < clone.length - 2; r++) {
      if (
        isVoid(clone[r][c]) || // current is empty
        (isBlocked(clone[r][c - 1]) && isBlocked(clone[r][c + 1])) || // neighbours are empty
        (isBlocked(clone[r + 1][c - 1]) && isBlocked(clone[r + 1][c + 1])) // bottom row neighbours are empty
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

