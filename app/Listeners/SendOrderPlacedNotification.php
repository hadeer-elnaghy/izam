<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderPlacedAdmin;

class SendOrderPlacedNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        // Simulate sending an email to the admin
        Log::info('Order placed. Admin notified. Order ID: ' . $event->order->id);
        // // Send email to admin
        // Mail::to(config('mail.admin_address', 'admin@example.com'))
        //     ->send(new OrderPlacedAdmin($event->order));
    }
}
