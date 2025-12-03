import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CodenamesController::__invoke
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/codenames',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CodenamesController::__invoke
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CodenamesController::__invoke
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CodenamesController::__invoke
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const codenames = {
    index: Object.assign(index, index),
}

export default codenames