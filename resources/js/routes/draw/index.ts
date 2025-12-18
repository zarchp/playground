import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DrawController::__invoke
 * @see app/Http/Controllers/DrawController.php:11
 * @route '/free-draw'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/free-draw',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DrawController::__invoke
 * @see app/Http/Controllers/DrawController.php:11
 * @route '/free-draw'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DrawController::__invoke
 * @see app/Http/Controllers/DrawController.php:11
 * @route '/free-draw'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DrawController::__invoke
 * @see app/Http/Controllers/DrawController.php:11
 * @route '/free-draw'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const draw = {
    index: Object.assign(index, index),
}

export default draw