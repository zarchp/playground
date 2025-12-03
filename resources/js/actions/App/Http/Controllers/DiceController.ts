import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DiceController::__invoke
 * @see app/Http/Controllers/DiceController.php:16
 * @route '/dice'
 */
const DiceController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DiceController.url(options),
    method: 'get',
})

DiceController.definition = {
    methods: ["get","head"],
    url: '/dice',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DiceController::__invoke
 * @see app/Http/Controllers/DiceController.php:16
 * @route '/dice'
 */
DiceController.url = (options?: RouteQueryOptions) => {
    return DiceController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiceController::__invoke
 * @see app/Http/Controllers/DiceController.php:16
 * @route '/dice'
 */
DiceController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DiceController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DiceController::__invoke
 * @see app/Http/Controllers/DiceController.php:16
 * @route '/dice'
 */
DiceController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: DiceController.url(options),
    method: 'head',
})
export default DiceController