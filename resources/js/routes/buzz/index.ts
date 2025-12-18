import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\BuzzController::index
 * @see app/Http/Controllers/BuzzController.php:26
 * @route '/buzz'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/buzz',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BuzzController::index
 * @see app/Http/Controllers/BuzzController.php:26
 * @route '/buzz'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BuzzController::index
 * @see app/Http/Controllers/BuzzController.php:26
 * @route '/buzz'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BuzzController::index
 * @see app/Http/Controllers/BuzzController.php:26
 * @route '/buzz'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BuzzController::room
 * @see app/Http/Controllers/BuzzController.php:34
 * @route '/buzz/{roomCode}'
 */
export const room = (args: { roomCode: string | number } | [roomCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: room.url(args, options),
    method: 'get',
})

room.definition = {
    methods: ["get","head"],
    url: '/buzz/{roomCode}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BuzzController::room
 * @see app/Http/Controllers/BuzzController.php:34
 * @route '/buzz/{roomCode}'
 */
room.url = (args: { roomCode: string | number } | [roomCode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { roomCode: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    roomCode: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        roomCode: args.roomCode,
                }

    return room.definition.url
            .replace('{roomCode}', parsedArgs.roomCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BuzzController::room
 * @see app/Http/Controllers/BuzzController.php:34
 * @route '/buzz/{roomCode}'
 */
room.get = (args: { roomCode: string | number } | [roomCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: room.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BuzzController::room
 * @see app/Http/Controllers/BuzzController.php:34
 * @route '/buzz/{roomCode}'
 */
room.head = (args: { roomCode: string | number } | [roomCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: room.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BuzzController::createRoom
 * @see app/Http/Controllers/BuzzController.php:62
 * @route '/buzz/create-room'
 */
export const createRoom = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createRoom.url(options),
    method: 'post',
})

createRoom.definition = {
    methods: ["post"],
    url: '/buzz/create-room',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BuzzController::createRoom
 * @see app/Http/Controllers/BuzzController.php:62
 * @route '/buzz/create-room'
 */
createRoom.url = (options?: RouteQueryOptions) => {
    return createRoom.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BuzzController::createRoom
 * @see app/Http/Controllers/BuzzController.php:62
 * @route '/buzz/create-room'
 */
createRoom.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createRoom.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BuzzController::joinRoom
 * @see app/Http/Controllers/BuzzController.php:90
 * @route '/buzz/join-room'
 */
export const joinRoom = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: joinRoom.url(options),
    method: 'post',
})

joinRoom.definition = {
    methods: ["post"],
    url: '/buzz/join-room',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BuzzController::joinRoom
 * @see app/Http/Controllers/BuzzController.php:90
 * @route '/buzz/join-room'
 */
joinRoom.url = (options?: RouteQueryOptions) => {
    return joinRoom.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BuzzController::joinRoom
 * @see app/Http/Controllers/BuzzController.php:90
 * @route '/buzz/join-room'
 */
joinRoom.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: joinRoom.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BuzzController::buzz
 * @see app/Http/Controllers/BuzzController.php:141
 * @route '/buzz/buzz'
 */
export const buzz = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: buzz.url(options),
    method: 'post',
})

buzz.definition = {
    methods: ["post"],
    url: '/buzz/buzz',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BuzzController::buzz
 * @see app/Http/Controllers/BuzzController.php:141
 * @route '/buzz/buzz'
 */
buzz.url = (options?: RouteQueryOptions) => {
    return buzz.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BuzzController::buzz
 * @see app/Http/Controllers/BuzzController.php:141
 * @route '/buzz/buzz'
 */
buzz.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: buzz.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BuzzController::reset
 * @see app/Http/Controllers/BuzzController.php:206
 * @route '/buzz/reset'
 */
export const reset = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(options),
    method: 'post',
})

reset.definition = {
    methods: ["post"],
    url: '/buzz/reset',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BuzzController::reset
 * @see app/Http/Controllers/BuzzController.php:206
 * @route '/buzz/reset'
 */
reset.url = (options?: RouteQueryOptions) => {
    return reset.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BuzzController::reset
 * @see app/Http/Controllers/BuzzController.php:206
 * @route '/buzz/reset'
 */
reset.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reset.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BuzzController::leaveRoom
 * @see app/Http/Controllers/BuzzController.php:235
 * @route '/buzz/leave-room'
 */
export const leaveRoom = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: leaveRoom.url(options),
    method: 'post',
})

leaveRoom.definition = {
    methods: ["post"],
    url: '/buzz/leave-room',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BuzzController::leaveRoom
 * @see app/Http/Controllers/BuzzController.php:235
 * @route '/buzz/leave-room'
 */
leaveRoom.url = (options?: RouteQueryOptions) => {
    return leaveRoom.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BuzzController::leaveRoom
 * @see app/Http/Controllers/BuzzController.php:235
 * @route '/buzz/leave-room'
 */
leaveRoom.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: leaveRoom.url(options),
    method: 'post',
})
const buzz = {
    index: Object.assign(index, index),
room: Object.assign(room, room),
createRoom: Object.assign(createRoom, createRoom),
joinRoom: Object.assign(joinRoom, joinRoom),
buzz: Object.assign(buzz, buzz),
reset: Object.assign(reset, reset),
leaveRoom: Object.assign(leaveRoom, leaveRoom),
}

export default buzz