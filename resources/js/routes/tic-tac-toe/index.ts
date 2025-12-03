import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TicTacToeController::__invoke
 * @see app/Http/Controllers/TicTacToeController.php:16
 * @route '/tic-tac-toe'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tic-tac-toe',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TicTacToeController::__invoke
 * @see app/Http/Controllers/TicTacToeController.php:16
 * @route '/tic-tac-toe'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TicTacToeController::__invoke
 * @see app/Http/Controllers/TicTacToeController.php:16
 * @route '/tic-tac-toe'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TicTacToeController::__invoke
 * @see app/Http/Controllers/TicTacToeController.php:16
 * @route '/tic-tac-toe'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const ticTacToe = {
    index: Object.assign(index, index),
}

export default ticTacToe