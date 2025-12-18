import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MultibuzzController::index
 * @see app/Http/Controllers/MultibuzzController.php:16
 * @route '/multibuzz'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/multibuzz',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MultibuzzController::index
 * @see app/Http/Controllers/MultibuzzController.php:16
 * @route '/multibuzz'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MultibuzzController::index
 * @see app/Http/Controllers/MultibuzzController.php:16
 * @route '/multibuzz'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MultibuzzController::index
 * @see app/Http/Controllers/MultibuzzController.php:16
 * @route '/multibuzz'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MultibuzzController::createRoom
 * @see app/Http/Controllers/MultibuzzController.php:21
 * @route '/multibuzz'
 */
export const createRoom = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createRoom.url(options),
    method: 'post',
})

createRoom.definition = {
    methods: ["post"],
    url: '/multibuzz',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MultibuzzController::createRoom
 * @see app/Http/Controllers/MultibuzzController.php:21
 * @route '/multibuzz'
 */
createRoom.url = (options?: RouteQueryOptions) => {
    return createRoom.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MultibuzzController::createRoom
 * @see app/Http/Controllers/MultibuzzController.php:21
 * @route '/multibuzz'
 */
createRoom.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createRoom.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MultibuzzController::joinRoom
 * @see app/Http/Controllers/MultibuzzController.php:50
 * @route '/multibuzz/join'
 */
export const joinRoom = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: joinRoom.url(options),
    method: 'post',
})

joinRoom.definition = {
    methods: ["post"],
    url: '/multibuzz/join',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MultibuzzController::joinRoom
 * @see app/Http/Controllers/MultibuzzController.php:50
 * @route '/multibuzz/join'
 */
joinRoom.url = (options?: RouteQueryOptions) => {
    return joinRoom.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MultibuzzController::joinRoom
 * @see app/Http/Controllers/MultibuzzController.php:50
 * @route '/multibuzz/join'
 */
joinRoom.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: joinRoom.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MultibuzzController::buzz
 * @see app/Http/Controllers/MultibuzzController.php:88
 * @route '/multibuzz/{code}/buzz'
 */
export const buzz = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: buzz.url(args, options),
    method: 'post',
})

buzz.definition = {
    methods: ["post"],
    url: '/multibuzz/{code}/buzz',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MultibuzzController::buzz
 * @see app/Http/Controllers/MultibuzzController.php:88
 * @route '/multibuzz/{code}/buzz'
 */
buzz.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    code: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        code: args.code,
                }

    return buzz.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MultibuzzController::buzz
 * @see app/Http/Controllers/MultibuzzController.php:88
 * @route '/multibuzz/{code}/buzz'
 */
buzz.post = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: buzz.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MultibuzzController::results
 * @see app/Http/Controllers/MultibuzzController.php:141
 * @route '/multibuzz/{code}/results'
 */
export const results = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: results.url(args, options),
    method: 'get',
})

results.definition = {
    methods: ["get","head"],
    url: '/multibuzz/{code}/results',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MultibuzzController::results
 * @see app/Http/Controllers/MultibuzzController.php:141
 * @route '/multibuzz/{code}/results'
 */
results.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    code: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        code: args.code,
                }

    return results.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MultibuzzController::results
 * @see app/Http/Controllers/MultibuzzController.php:141
 * @route '/multibuzz/{code}/results'
 */
results.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: results.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MultibuzzController::results
 * @see app/Http/Controllers/MultibuzzController.php:141
 * @route '/multibuzz/{code}/results'
 */
results.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: results.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MultibuzzController::reset
 * @see app/Http/Controllers/MultibuzzController.php:147
 * @route '/multibuzz/{code}/reset'
 */
export const reset = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(args, options),
    method: 'post',
})

reset.definition = {
    methods: ["post"],
    url: '/multibuzz/{code}/reset',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MultibuzzController::reset
 * @see app/Http/Controllers/MultibuzzController.php:147
 * @route '/multibuzz/{code}/reset'
 */
reset.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    code: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        code: args.code,
                }

    return reset.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MultibuzzController::reset
 * @see app/Http/Controllers/MultibuzzController.php:147
 * @route '/multibuzz/{code}/reset'
 */
reset.post = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MultibuzzController::room
 * @see app/Http/Controllers/MultibuzzController.php:78
 * @route '/multibuzz/{code}'
 */
export const room = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: room.url(args, options),
    method: 'get',
})

room.definition = {
    methods: ["get","head"],
    url: '/multibuzz/{code}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MultibuzzController::room
 * @see app/Http/Controllers/MultibuzzController.php:78
 * @route '/multibuzz/{code}'
 */
room.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    code: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        code: args.code,
                }

    return room.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MultibuzzController::room
 * @see app/Http/Controllers/MultibuzzController.php:78
 * @route '/multibuzz/{code}'
 */
room.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: room.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MultibuzzController::room
 * @see app/Http/Controllers/MultibuzzController.php:78
 * @route '/multibuzz/{code}'
 */
room.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: room.url(args, options),
    method: 'head',
})
const multibuzz = {
    index: Object.assign(index, index),
createRoom: Object.assign(createRoom, createRoom),
joinRoom: Object.assign(joinRoom, joinRoom),
buzz: Object.assign(buzz, buzz),
results: Object.assign(results, results),
reset: Object.assign(reset, reset),
room: Object.assign(room, room),
}

export default multibuzz