import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TicTacToeController::__invoke
 * @see app/Http/Controllers/TicTacToeController.php:14
 * @route '/tic-tac-toe'
 */
const TicTacToeController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: TicTacToeController.url(options),
    method: 'get',
})

TicTacToeController.definition = {
    methods: ['get','head'],
    url: '/tic-tac-toe',
}

/**
* @see \App\Http\Controllers\TicTacToeController::__invoke
 * @see app/Http/Controllers/TicTacToeController.php:14
 * @route '/tic-tac-toe'
 */
TicTacToeController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return TicTacToeController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicTacToeController::__invoke
 * @see app/Http/Controllers/TicTacToeController.php:14
 * @route '/tic-tac-toe'
 */
TicTacToeController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: TicTacToeController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TicTacToeController::__invoke
 * @see app/Http/Controllers/TicTacToeController.php:14
 * @route '/tic-tac-toe'
 */
TicTacToeController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: TicTacToeController.url(options),
    method: 'head',
})
export default TicTacToeController