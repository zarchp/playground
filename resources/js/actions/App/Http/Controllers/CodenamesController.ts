import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CodenamesController::__invoke
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
const CodenamesController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: CodenamesController.url(options),
    method: 'get',
})

CodenamesController.definition = {
    methods: ['get','head'],
    url: '/codenames',
}

/**
* @see \App\Http\Controllers\CodenamesController::__invoke
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
CodenamesController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return CodenamesController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CodenamesController::__invoke
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
CodenamesController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: CodenamesController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CodenamesController::__invoke
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
CodenamesController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: CodenamesController.url(options),
    method: 'head',
})
export default CodenamesController