import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SudokuController::index
 * @see app/Http/Controllers/SudokuController.php:15
 * @route '/sudoku'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sudoku',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SudokuController::index
 * @see app/Http/Controllers/SudokuController.php:15
 * @route '/sudoku'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SudokuController::index
 * @see app/Http/Controllers/SudokuController.php:15
 * @route '/sudoku'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SudokuController::index
 * @see app/Http/Controllers/SudokuController.php:15
 * @route '/sudoku'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SudokuController::newMethod
 * @see app/Http/Controllers/SudokuController.php:31
 * @route '/sudoku/new'
 */
export const newMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: newMethod.url(options),
    method: 'post',
})

newMethod.definition = {
    methods: ["post"],
    url: '/sudoku/new',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SudokuController::newMethod
 * @see app/Http/Controllers/SudokuController.php:31
 * @route '/sudoku/new'
 */
newMethod.url = (options?: RouteQueryOptions) => {
    return newMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SudokuController::newMethod
 * @see app/Http/Controllers/SudokuController.php:31
 * @route '/sudoku/new'
 */
newMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: newMethod.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SudokuController::score
 * @see app/Http/Controllers/SudokuController.php:41
 * @route '/sudoku/score'
 */
export const score = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: score.url(options),
    method: 'post',
})

score.definition = {
    methods: ["post"],
    url: '/sudoku/score',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SudokuController::score
 * @see app/Http/Controllers/SudokuController.php:41
 * @route '/sudoku/score'
 */
score.url = (options?: RouteQueryOptions) => {
    return score.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SudokuController::score
 * @see app/Http/Controllers/SudokuController.php:41
 * @route '/sudoku/score'
 */
score.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: score.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SudokuController::leaderboard
 * @see app/Http/Controllers/SudokuController.php:68
 * @route '/sudoku/leaderboard'
 */
export const leaderboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaderboard.url(options),
    method: 'get',
})

leaderboard.definition = {
    methods: ["get","head"],
    url: '/sudoku/leaderboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SudokuController::leaderboard
 * @see app/Http/Controllers/SudokuController.php:68
 * @route '/sudoku/leaderboard'
 */
leaderboard.url = (options?: RouteQueryOptions) => {
    return leaderboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SudokuController::leaderboard
 * @see app/Http/Controllers/SudokuController.php:68
 * @route '/sudoku/leaderboard'
 */
leaderboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaderboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SudokuController::leaderboard
 * @see app/Http/Controllers/SudokuController.php:68
 * @route '/sudoku/leaderboard'
 */
leaderboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leaderboard.url(options),
    method: 'head',
})
const sudoku = {
    index: Object.assign(index, index),
new: Object.assign(newMethod, newMethod),
score: Object.assign(score, score),
leaderboard: Object.assign(leaderboard, leaderboard),
}

export default sudoku