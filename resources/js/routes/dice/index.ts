import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DiceController::index
 * @see app/Http/Controllers/DiceController.php:16
 * @route '/dice'
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
    url: '/dice',
}

/**
* @see \App\Http\Controllers\DiceController::index
 * @see app/Http/Controllers/DiceController.php:16
 * @route '/dice'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiceController::index
 * @see app/Http/Controllers/DiceController.php:16
 * @route '/dice'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DiceController::index
 * @see app/Http/Controllers/DiceController.php:16
 * @route '/dice'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})
const dice = {
    index,
}

export default dice