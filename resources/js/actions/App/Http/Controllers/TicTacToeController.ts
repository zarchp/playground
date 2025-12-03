import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TicTacToeController::__invoke
 * @see app/Http/Controllers/TicTacToeController.php:16
 * @route '/tic-tac-toe'
 */
const TicTacToeController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: TicTacToeController.url(options),
    method: 'get',
})

TicTacToeController.definition = {
    methods: ["get","head"],
    url: '/tic-tac-toe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TicTacToeController::__invoke
 * @see app/Http/Controllers/TicTacToeController.php:16
 * @route '/tic-tac-toe'
 */
TicTacToeController.url = (options?: RouteQueryOptions) => {
    return TicTacToeController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicTacToeController::__invoke
 * @see app/Http/Controllers/TicTacToeController.php:16
 * @route '/tic-tac-toe'
 */
TicTacToeController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: TicTacToeController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TicTacToeController::__invoke
 * @see app/Http/Controllers/TicTacToeController.php:16
 * @route '/tic-tac-toe'
 */
TicTacToeController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: TicTacToeController.url(options),
    method: 'head',
})
export default TicTacToeController