import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CodenamesController::index
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/codenames',
}

/**
* @see \App\Http\Controllers\CodenamesController::index
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CodenamesController::index
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CodenamesController::index
 * @see app/Http/Controllers/CodenamesController.php:14
 * @route '/codenames'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})
const codenames = {
    index,
}

export default codenames