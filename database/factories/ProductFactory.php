<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        $categories = ['Electronics', 'Books', 'Clothing', 'Toys', 'Home'];
        return [
            'name' => $this->faker->words(2, true),
            'price' => $this->faker->randomFloat(2, 5, 500),
            'category' => $this->faker->randomElement($categories),
            'stock' => $this->faker->numberBetween(1, 100),
            'image' => $this->faker->imageUrl(400, 400, 'product', true),
        ];
    }
} 