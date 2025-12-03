import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FourEightController::__invoke
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
const FourEightController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: FourEightController.url(options),
    method: 'get',
})

FourEightController.definition = {
    methods: ["get","head"],
    url: '/2048',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FourEightController::__invoke
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
FourEightController.url = (options?: RouteQueryOptions) => {
    return FourEightController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FourEightController::__invoke
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
FourEightController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: FourEightController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FourEightController::__invoke
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
FourEightController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: FourEightController.url(options),
    method: 'head',
})
export default FourEightController