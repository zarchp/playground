import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CodenamesController::__invoke
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
const CodenamesController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CodenamesController.url(options),
    method: 'get',
})

CodenamesController.definition = {
    methods: ["get","head"],
    url: '/codenames',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CodenamesController::__invoke
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
CodenamesController.url = (options?: RouteQueryOptions) => {
    return CodenamesController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CodenamesController::__invoke
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
CodenamesController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: CodenamesController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CodenamesController::__invoke
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
CodenamesController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: CodenamesController.url(options),
    method: 'head',
})
export default CodenamesController