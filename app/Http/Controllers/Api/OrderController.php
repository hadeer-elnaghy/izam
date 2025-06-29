<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Events\OrderPlaced;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $productsData = $request->input('products');
        $user = Auth::user();
        $total = 0;
        $orderProducts = [];

        DB::beginTransaction();
        try {
            foreach ($productsData as $item) {
                $product = Product::lockForUpdate()->find($item['id']);
                if (!$product || $product->stock < $item['quantity']) {
                    DB::rollBack();
                    return response()->json(['error' => 'Product not available or insufficient stock.'], 400);
                }
                $total += $product->price * $item['quantity'];
                $orderProducts[$product->id] = ['quantity' => $item['quantity']];
                $product->decrement('stock', $item['quantity']);
            }
            $shipping = $total > 0 ? 15 : 0;
            $tax = $total > 0 ? 12.5 : 0;
            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total,
                'shipping' => $shipping,
                'tax' => $tax,
            ]);
            $order->products()->attach($orderProducts);
            Event::dispatch(new OrderPlaced($order));
            DB::commit();
            return response()->json(['order_id' => $order->id], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Order could not be placed.'], 500);
        }
    }

    public function show($id)
    {
        $order = Order::with('products')->find($id);
        if (!$order) {
            return response()->json(['error' => 'Order not found.'], 404);
        }
        $products = $order->products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $product->pivot->quantity,
                'subtotal' => $product->price * $product->pivot->quantity,
            ];
        });
        return response()->json([
            'id' => $order->id,
            'user_id' => $order->user_id,
            'total' => $order->total,
            'shipping' => $order->shipping,
            'tax' => $order->tax,
            'products' => $products,
        ]);
    }
}
