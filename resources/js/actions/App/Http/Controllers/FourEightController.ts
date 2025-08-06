import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FourEightController::__invoke
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
const FourEightController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: FourEightController.url(options),
    method: 'get',
})

FourEightController.definition = {
    methods: ['get','head'],
    url: '/2048',
}

/**
* @see \App\Http\Controllers\FourEightController::__invoke
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
FourEightController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return FourEightController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FourEightController::__invoke
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
FourEightController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: FourEightController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FourEightController::__invoke
 * @see app/Http/Controllers/FourEightController.php:16
 * @route '/2048'
 */
FourEightController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: FourEightController.url(options),
    method: 'head',
})
export default FourEightController