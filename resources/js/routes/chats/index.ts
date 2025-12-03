import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:21
 * @route '/chats'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/chats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:21
 * @route '/chats'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:21
 * @route '/chats'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:21
 * @route '/chats'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChatController::create
 * @see app/Http/Controllers/ChatController.php:46
 * @route '/chats/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/chats/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::create
 * @see app/Http/Controllers/ChatController.php:46
 * @route '/chats/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::create
 * @see app/Http/Controllers/ChatController.php:46
 * @route '/chats/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ChatController::create
 * @see app/Http/Controllers/ChatController.php:46
 * @route '/chats/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChatController::store
 * @see app/Http/Controllers/ChatController.php:54
 * @route '/chats'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/chats',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::store
 * @see app/Http/Controllers/ChatController.php:54
 * @route '/chats'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::store
 * @see app/Http/Controllers/ChatController.php:54
 * @route '/chats'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChatController::show
 * @see app/Http/Controllers/ChatController.php:66
 * @route '/chats/{chat}'
 */
export const show = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/chats/{chat}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::show
 * @see app/Http/Controllers/ChatController.php:66
 * @route '/chats/{chat}'
 */
show.url = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { chat: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { chat: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    chat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        chat: typeof args.chat === 'object'
                ? args.chat.id
                : args.chat,
                }

    return show.definition.url
            .replace('{chat}', parsedArgs.chat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::show
 * @see app/Http/Controllers/ChatController.php:66
 * @route '/chats/{chat}'
 */
show.get = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ChatController::show
 * @see app/Http/Controllers/ChatController.php:66
 * @route '/chats/{chat}'
 */
show.head = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChatController::edit
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chats/{chat}/edit'
 */
export const edit = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/chats/{chat}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::edit
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chats/{chat}/edit'
 */
edit.url = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { chat: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { chat: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    chat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        chat: typeof args.chat === 'object'
                ? args.chat.id
                : args.chat,
                }

    return edit.definition.url
            .replace('{chat}', parsedArgs.chat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::edit
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chats/{chat}/edit'
 */
edit.get = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ChatController::edit
 * @see app/Http/Controllers/ChatController.php:74
 * @route '/chats/{chat}/edit'
 */
edit.head = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChatController::update
 * @see app/Http/Controllers/ChatController.php:82
 * @route '/chats/{chat}'
 */
export const update = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/chats/{chat}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ChatController::update
 * @see app/Http/Controllers/ChatController.php:82
 * @route '/chats/{chat}'
 */
update.url = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { chat: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { chat: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    chat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        chat: typeof args.chat === 'object'
                ? args.chat.id
                : args.chat,
                }

    return update.definition.url
            .replace('{chat}', parsedArgs.chat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::update
 * @see app/Http/Controllers/ChatController.php:82
 * @route '/chats/{chat}'
 */
update.put = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ChatController::update
 * @see app/Http/Controllers/ChatController.php:82
 * @route '/chats/{chat}'
 */
update.patch = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ChatController::destroy
 * @see app/Http/Controllers/ChatController.php:90
 * @route '/chats/{chat}'
 */
export const destroy = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/chats/{chat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ChatController::destroy
 * @see app/Http/Controllers/ChatController.php:90
 * @route '/chats/{chat}'
 */
destroy.url = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { chat: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { chat: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    chat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        chat: typeof args.chat === 'object'
                ? args.chat.id
                : args.chat,
                }

    return destroy.definition.url
            .replace('{chat}', parsedArgs.chat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::destroy
 * @see app/Http/Controllers/ChatController.php:90
 * @route '/chats/{chat}'
 */
destroy.delete = (args: { chat: number | { id: number } } | [chat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const chats = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default chats