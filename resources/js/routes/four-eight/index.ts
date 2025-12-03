import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\FourEightController::__invoke
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/2048',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FourEightController::__invoke
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FourEightController::__invoke
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FourEightController::__invoke
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const fourEight = {
    index: Object.assign(index, index),
}

export default fourEight