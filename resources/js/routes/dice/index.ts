import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DiceController::__invoke
 * @see app/Http/Controllers/DiceController.php:16
 * @route '/dice'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dice',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DiceController::__invoke
 * @see app/Http/Controllers/DiceController.php:16
 * @route '/dice'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiceController::__invoke
 * @see app/Http/Controllers/DiceController.php:16
 * @route '/dice'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DiceController::__invoke
 * @see app/Http/Controllers/DiceController.php:16
 * @route '/dice'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const dice = {
    index: Object.assign(index, index),
}

export default dice