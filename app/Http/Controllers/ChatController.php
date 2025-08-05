<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\StoreChatRequest;
use App\Http\Requests\UpdateChatRequest;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class ChatController
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $senderId = auth()->id();
        $receiverId = $senderId === 1 ? 2 : 1;
        $receiverName = User::find($receiverId)?->name;
        $chats = Chat::query()
            ->with(['sender', 'receiver'])
            ->where(function (Builder $query) use ($senderId) {
                $query->where('sender_id', $senderId)
                    ->orWhere('receiver_id', $senderId);
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('chats/index', [
            'chats' => $chats,
            'senderId' => $senderId,
            'receiverId' => $receiverId,
            'receiverName' => $receiverName
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChatRequest $storeChatRequest): void
    {
        $chat = Chat::create($storeChatRequest->validated());

        broadcast(new MessageSent($chat));

        // return redirect()->route('chats.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chat $chat): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChatRequest $updateChatRequest, Chat $chat): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat): void
    {
        //
    }
}
