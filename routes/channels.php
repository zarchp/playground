<?php

use Illuminate\Support\Facades\Broadcast;

/* Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
}); */

Broadcast::channel('chat.{receiverId}', function ($user, $receiverId) {
    return (int) $user->id === (int) $receiverId;
});

/* Broadcast::channel('presence.chat', function ($user, $id) {
    return [
        'id' => $user->id,
        'name' => $user->name,
    ];
}); */
