import { queryParams, type QueryParams } from './../../wayfinder';
/**
 * @see \App\Http\Controllers\TicTacToeController::index
 * @see app/Http/Controllers/TicTacToeController.php:16
 * @route '/tic-tac-toe'
 */
export const index = (options?: {
  query?: QueryParams;
  mergeQuery?: QueryParams;
}): {
  url: string;
  method: 'get';
} => ({
  url: index.url(options),
  method: 'get',
});

index.definition = {
  methods: ['get', 'head'],
  url: '/tic-tac-toe',
};

/**
 * @see \App\Http\Controllers\TicTacToeController::index
 * @see app/Http/Controllers/TicTacToeController.php:16
 * @route '/tic-tac-toe'
 */
index.url = (options?: { query?: QueryParams; mergeQuery?: QueryParams }) => {
  return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\TicTacToeController::index
 * @see app/Http/Controllers/TicTacToeController.php:16
 * @route '/tic-tac-toe'
 */
index.get = (options?: {
  query?: QueryParams;
  mergeQuery?: QueryParams;
}): {
  url: string;
  method: 'get';
} => ({
  url: index.url(options),
  method: 'get',
});
/**
 * @see \App\Http\Controllers\TicTacToeController::index
 * @see app/Http/Controllers/TicTacToeController.php:16
 * @route '/tic-tac-toe'
 */
index.head = (options?: {
  query?: QueryParams;
  mergeQuery?: QueryParams;
}): {
  url: string;
  method: 'head';
} => ({
  url: index.url(options),
  method: 'head',
});
const ticTacToe = {
  index,
};

export default ticTacToe;
