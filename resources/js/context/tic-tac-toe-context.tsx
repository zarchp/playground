import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Player = 'X' | 'O' | null;
export type GameMode = 'PVP' | 'EASY' | 'MEDIUM' | 'HARD';

interface TicTacToeContextProps {
  board: Player[];
  isXNext: boolean;
  winner: Player;
  isDraw: boolean;
  mode: GameMode;
  score: { X: number; O: number; Draw: number };
  handleClick: (index: number) => void;
  handleReset: () => void;
  handleModeChange: (mode: GameMode) => void;
}

const TicTacToeContext = createContext<TicTacToeContextProps | undefined>(
  undefined,
);

function calculateWinner(squares: Player[]): Player {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function minimax(
  newBoard: Player[],
  player: Player,
): { index: number; score: number } {
  const availSpots = newBoard
    .map((val, idx) => (val === null ? idx : -1))
    .filter((idx) => idx !== -1);

  const winner = calculateWinner(newBoard);
  if (winner === 'X') return { score: 1, index: -1 };
  if (winner === 'O') return { score: -1, index: -1 };
  if (availSpots.length === 0) return { score: 0, index: -1 };

  const moves = [];
  for (const i of availSpots) {
    const move = { index: i, score: 0 };
    newBoard[i] = player;
    const result = minimax(newBoard, player === 'X' ? 'O' : 'X');
    move.score = result.score;
    newBoard[i] = null;
    moves.push(move);
  }

  let bestMove;
  if (player === 'X') {
    let bestScore = -Infinity;
    for (const move of moves) {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
  } else {
    let bestScore = Infinity;
    for (const move of moves) {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
  }
  return bestMove!;
}

function findBlockingMove(
  board: Player[],
  player: Player,
  opponent: Player,
): number {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    const line = [board[a], board[b], board[c]];
    if (
      line.filter((v) => v === opponent).length === 2 &&
      line.includes(null)
    ) {
      return [a, b, c][line.indexOf(null)];
    }
  }
  return -1;
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0, Draw: 0 });
  const [mode, setMode] = useState<GameMode>('PVP');

  const getAIMove = useCallback(
    (board: Player[], difficulty: GameMode): number => {
      if (difficulty === 'EASY') {
        const empty = board
          .map((v, i) => (v === null ? i : -1))
          .filter((i) => i !== -1);
        return empty[Math.floor(Math.random() * empty.length)];
      }
      if (difficulty === 'MEDIUM') {
        const block =
          findBlockingMove(board, 'O', 'X') ||
          findBlockingMove(board, 'X', 'O');
        if (block !== -1) return block;
        return getAIMove(board, 'EASY');
      }
      if (difficulty === 'HARD') {
        return minimax(board, 'O').index;
      }
      return -1;
    },
    [],
  );

  const handleClick = (index: number) => {
    if (winner || isDraw) {
      setBoard(Array(9).fill(null));
      setIsDraw(false);
      setWinner(null);
      return;
    }

    if (board[index] || (mode !== 'PVP' && !isXNext)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setIsDraw(false);
    setWinner(null);
    setScore({ X: 0, O: 0, Draw: 0 });
  };

  const handleModeChange = (newMode: GameMode) => {
    setMode(newMode);
    handleReset();
  };

  useEffect(() => {
    const result = calculateWinner(board);
    const isFull = !result && board.every((square) => square !== null);

    if (result) {
      setWinner(result);
      setScore((prev) => ({ ...prev, [result]: prev[result] + 1 }));
    } else if (isFull) {
      setIsDraw(true);
      setScore((prev) => ({ ...prev, Draw: prev.Draw + 1 }));
    } else if (mode !== 'PVP' && !isXNext && !result) {
      const botMove = getAIMove(board, mode);
      if (botMove !== -1) {
        setTimeout(() => {
          const newBoard = [...board];
          newBoard[botMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }, 250);
      }
    }
  }, [board, isXNext, mode, getAIMove]);

  return (
    <TicTacToeContext.Provider
      value={{
        board,
        isXNext,
        winner,
        isDraw,
        mode,
        score,
        handleClick,
        handleReset,
        handleModeChange,
      }}
    >
      {children}
    </TicTacToeContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(TicTacToeContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
