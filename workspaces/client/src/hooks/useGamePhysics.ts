import { BoardType, VoidCell } from '../domain/enums/BlockName';
import { BlockShape } from '../domain/game/BlockShapes';

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

  return {
    checkCollisions
  }
}