<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Events\OrderPlaced;
use App\Listeners\SendOrderPlacedNotification;
use Illuminate\Support\Facades\Event;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Event::listen(
            OrderPlaced::class,
            SendOrderPlacedNotification::class,
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
