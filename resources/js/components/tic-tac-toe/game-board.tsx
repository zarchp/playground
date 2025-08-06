import { useGame } from '@/context/tic-tac-toe-context';

export const GameBoard = () => {
  const { board, handleClick } = useGame();
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 bg-gray-900 lg:gap-2 dark:bg-white">
      {board.map((player, index) => (
        <div
          key={index}
          className="flex h-28 w-28 cursor-pointer items-center justify-center bg-white text-8xl lg:h-40 lg:w-40 lg:text-9xl dark:bg-background"
          onClick={() => handleClick(index)}
        >
          {player}
        </div>
      ))}
    </div>
  );
};
