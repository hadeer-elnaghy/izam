<?php
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'id' => 1,
                'name' => 'Polo with tipping details',
                'price' => 99.99,
                'category' => 'Polo',
                'stock' => 27,
                'image' => '/storage/products/kJw8juUcZcoDaDRfLsWzPgIMQi9t5jhhUq1OJsaj.jpg',
                'created_at' => '2025-06-27 12:22:52',
                'updated_at' => '2025-06-29 16:01:27',
            ],
            [
                'id' => 2,
                'name' => 'Gradient Graphic t-shirt',
                'price' => 200.00,
                'category' => 'T-shirts',
                'stock' => 28,
                'image' => '/storage/products/szYLQpmvlLUP0hUejyzxbxOQNCWQ7VjNF1yTEvLm.jpg',
                'created_at' => '2025-06-27 12:26:09',
                'updated_at' => '2025-06-29 16:38:08',
            ],
            [
                'id' => 3,
                'name' => 'Wide leg jeans',
                'price' => 300.00,
                'category' => 'Jeans',
                'stock' => 39,
                'image' => '/storage/products/ftV21hpbCgE4KnqvipdOqIsO8ZU5sQbalvNRpquh.jpg',
                'created_at' => '2025-06-27 12:26:09',
                'updated_at' => '2025-06-29 16:33:22',
            ],
            [
                'id' => 4,
                'name' => 'Checkered shirt',
                'price' => 120.00,
                'category' => 'Shirts',
                'stock' => 48,
                'image' => '/storage/products/IgYJpZx41zT45WkYczzdhzh12sTjqx4KvbcpUWQw.jpg',
                'created_at' => '2025-06-27 12:22:52',
                'updated_at' => '2025-06-27 12:33:08',
            ],
            [
                'id' => 5,
                'name' => 'Sleeve sttriped t-shirt',
                'price' => 200.00,
                'category' => 'T-shirts',
                'stock' => 48,
                'image' => '/storage/products/w17c7WW8XeQqo9Qd1KEdm7HvXxOOH66naoloYBZT.jpg',
                'created_at' => '2025-06-27 12:22:52',
                'updated_at' => '2025-06-27 12:33:08',
            ],
            [
                'id' => 6,
                'name' => 'Blue T-shirt',
                'price' => 300.00,
                'category' => 'T-shirts',
                'stock' => 49,
                'image' => '/storage/products/QPTMstO7QU4IMHLMfl53U8jvKDdMDdm7DdtQwd2G.jpg',
                'created_at' => '2025-06-27 12:26:09',
                'updated_at' => '2025-06-27 12:33:08',
            ],
            [
                'id' => 7,
                'name' => 'Andora Mens Solid Pattern Half Sleeve Western',
                'price' => 300.00,
                'category' => 'T-shirts',
                'stock' => 49,
                'image' => '/storage/products/0LvikWHCzB4xHQM8lsXfY6fDykCLDQ7f8j4Srlj1.jpg',
                'created_at' => '2025-06-27 12:26:09',
                'updated_at' => '2025-06-27 12:33:08',
            ],
            [
                'id' => 8,
                'name' => 'Orange T-shirt',
                'price' => 270.00,
                'category' => 'T-shirts',
                'stock' => 48,
                'image' => '/storage/products/fu1zbvBtsbS7CrSv2lW83xihhyswOhuQYmA1qQ3U.jpg',
                'created_at' => '2025-06-27 12:22:52',
                'updated_at' => '2025-06-27 12:33:08',
            ],
        ];

        Product::insert($products);
    }
}
