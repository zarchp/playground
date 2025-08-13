import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SudokuController::index
 * @see app/Http/Controllers/SudokuController.php:15
 * @route '/sudoku'
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
    url: '/sudoku',
}

/**
* @see \App\Http\Controllers\SudokuController::index
 * @see app/Http/Controllers/SudokuController.php:15
 * @route '/sudoku'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SudokuController::index
 * @see app/Http/Controllers/SudokuController.php:15
 * @route '/sudoku'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SudokuController::index
 * @see app/Http/Controllers/SudokuController.php:15
 * @route '/sudoku'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SudokuController::newMethod
 * @see app/Http/Controllers/SudokuController.php:31
 * @route '/sudoku/new'
 */
export const newMethod = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: newMethod.url(options),
    method: 'post',
})

newMethod.definition = {
    methods: ['post'],
    url: '/sudoku/new',
}

/**
* @see \App\Http\Controllers\SudokuController::newMethod
 * @see app/Http/Controllers/SudokuController.php:31
 * @route '/sudoku/new'
 */
newMethod.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return newMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SudokuController::newMethod
 * @see app/Http/Controllers/SudokuController.php:31
 * @route '/sudoku/new'
 */
newMethod.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: newMethod.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SudokuController::score
 * @see app/Http/Controllers/SudokuController.php:41
 * @route '/sudoku/score'
 */
export const score = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: score.url(options),
    method: 'post',
})

score.definition = {
    methods: ['post'],
    url: '/sudoku/score',
}

/**
* @see \App\Http\Controllers\SudokuController::score
 * @see app/Http/Controllers/SudokuController.php:41
 * @route '/sudoku/score'
 */
score.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return score.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SudokuController::score
 * @see app/Http/Controllers/SudokuController.php:41
 * @route '/sudoku/score'
 */
score.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: score.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SudokuController::leaderboard
 * @see app/Http/Controllers/SudokuController.php:68
 * @route '/sudoku/leaderboard'
 */
export const leaderboard = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: leaderboard.url(options),
    method: 'get',
})

leaderboard.definition = {
    methods: ['get','head'],
    url: '/sudoku/leaderboard',
}

/**
* @see \App\Http\Controllers\SudokuController::leaderboard
 * @see app/Http/Controllers/SudokuController.php:68
 * @route '/sudoku/leaderboard'
 */
leaderboard.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return leaderboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SudokuController::leaderboard
 * @see app/Http/Controllers/SudokuController.php:68
 * @route '/sudoku/leaderboard'
 */
leaderboard.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: leaderboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SudokuController::leaderboard
 * @see app/Http/Controllers/SudokuController.php:68
 * @route '/sudoku/leaderboard'
 */
leaderboard.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: leaderboard.url(options),
    method: 'head',
})
const sudoku = {
    index,
new: newMethod,
score,
leaderboard,
}

export default sudoku