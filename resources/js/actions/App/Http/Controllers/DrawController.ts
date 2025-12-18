import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DrawController::__invoke
 * @see app/Http/Controllers/DrawController.php:11
 * @route '/free-draw'
 */
const DrawController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DrawController.url(options),
    method: 'get',
})

DrawController.definition = {
    methods: ["get","head"],
    url: '/free-draw',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DrawController::__invoke
 * @see app/Http/Controllers/DrawController.php:11
 * @route '/free-draw'
 */
DrawController.url = (options?: RouteQueryOptions) => {
    return DrawController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DrawController::__invoke
 * @see app/Http/Controllers/DrawController.php:11
 * @route '/free-draw'
 */
DrawController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DrawController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DrawController::__invoke
 * @see app/Http/Controllers/DrawController.php:11
 * @route '/free-draw'
 */
DrawController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: DrawController.url(options),
    method: 'head',
})
export default DrawController