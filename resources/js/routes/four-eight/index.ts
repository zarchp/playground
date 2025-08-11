import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\FourEightController::index
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
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
    url: '/2048',
}

/**
* @see \App\Http\Controllers\FourEightController::index
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FourEightController::index
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FourEightController::index
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})
const fourEight = {
    index,
}

export default fourEight