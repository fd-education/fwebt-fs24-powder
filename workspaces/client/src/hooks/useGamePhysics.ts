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
        console.log(current);
        console.log(i);
        if (current === VoidCell.VOID && j > lowestVoid) {
          lowestVoid = j;
        } else if (current !== VoidCell.VOID && lowestVoid !== -1) {
          clone[lowestVoid][i] = current;
          clone[j][i] = VoidCell.VOID;
          lowestVoid--;
        }
      }

      console.log(lowestVoid);
    }

    return clone;
  };

  const desintegrateBlocks = (board: BoardType) => {
    const clone = dropHangingBlocks(board);

    enum sides {
      LEFT,
      RIGHT,
    }

    const isEmpty = (e: BlockType) => {
      return e === undefined || e === VoidCell.VOID;
    };

    for (let c = 0; c < clone[0].length; c++) {
      for (let r = 0; r < clone.length - 2; r++) {
        if (
          isEmpty(clone[r][c]) || // current is empty
          (!isEmpty(clone[r][c - 1]) && !isEmpty(clone[r][c + 1])) || // neighbours are empty
          (!isEmpty(clone[r + 1][c - 1]) && !isEmpty(clone[r + 1][c - 1])) // bottom row neighbours are empty
        )
          continue;

        let leftHeight = 1;
        let rightHeight = 1;
        let i = 2;
        do {
          leftHeight += isEmpty(clone[r + i][c - 1]) ? 1 : 0;
          rightHeight += isEmpty(clone[r + i][c + 1]) ? 1 : 0;
          i++;
        } while (i + r < board.length);

        const current = clone[r][c];
        clone[r][c] = VoidCell.VOID;
        if (leftHeight === rightHeight) {
          if (Math.floor(Math.random() * 2) === sides.LEFT) {
            clone[r + leftHeight][c - 1] = current;
          } else {
            clone[r + rightHeight][c + 1] = current;
          }
        } else if (leftHeight > rightHeight) {
          clone[r + leftHeight][c - 1] = current;
        } else if (leftHeight < rightHeight) {
          clone[r + rightHeight][c + 1] = current;
        }
      }
    }

    return clone;
  };

  return {
    checkCollisions,
    dropHangingBlocks,
    desintegrateBlocks,
  };
};
